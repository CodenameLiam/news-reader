// Express for server-side functionality
const express = require("express");

// Axios for API requests
const axios = require("axios");

// Path, fs and util for file handling
const fs = require("fs");
const util = require("util");
const path = require("path");

// UUID for file ID generation
const { v4: uuidv4 } = require("uuid");

// Text to speech for voice generation
const textToSpeech = require("@google-cloud/text-to-speech");
const { count } = require("console");

// Define application
const app = express();

// Define port
const port = 3000;

// Define speech synthesizer client and key
const client = new textToSpeech.TextToSpeechClient();
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, "speech-sythesizer.json");

// Serve static assets built from the clientside
app.use(express.static("../client/build"));

// News endpoints
const guardianAPIKey = "b4238ea5-dcc6-4ea2-92d6-be291c59cd9b";
const newsAPIKey = "0f4e8edcce654d779a4315dab0be7e87";

app.get("/api/news/headlines", async (req, res) => {
	try {
		const { search, country } = req.query;

		const searchQ = search ? `&q=${search}` : "";
		const countryQ = country ? `&country=${country}` : "";

		const response = await axios.get(`https://newsapi.org/v2/top-headlines?apiKey=${newsAPIKey}${searchQ}${countryQ}`);

		const data = response.data.articles.map((article) => {
			const { title, description, author, urlToImage, publishedAt } = article;
			return { title: title, description: description, author: author, imageURL: urlToImage, published: publishedAt };
		});

		return res.json(data);
	} catch (error) {
		return res.send(error);
	}
});

app.get("/api/news/sections", async (req, res) => {
	try {
		let response = await axios.get(`https://content.guardianapis.com/sections?api-key=${guardianAPIKey}`);
		let data = response.data.response.results.map((section) => {
			return { id: section.id, name: section.webTitle };
		});
		return res.json(data);
	} catch (error) {
		return res.send(error);
	}
});

app.get("/api/news", async (req, res) => {
	try {
		const { search, section, page } = req.query;

		const searchQ = search ? `&q=${search}` : "";
		const sectionQ = section ? `&section=${section}` : "";
		const pageQ = page ? `&page=${page}` : "";
		const fields = "&show-fields=headline,byline,thumbnail,lastModified,body,trailText";

		const response = await axios.get(`https://content.guardianapis.com/search?api-key=${guardianAPIKey}${fields}${searchQ}${sectionQ}${pageQ}`);

		let data = response.data.response.results.map((result) => {
			const { headline, trailText, byline, thumbnail, lastModified, body } = result.fields;
			return { title: headline, description: trailText, author: byline, imageURL: thumbnail, published: lastModified, body: body };
		});

		return res.json(data);
	} catch (error) {
		return res.send(error);
	}
});

app.get("/api/voice/get/:content", async (req, res) => {
	try {
		const content = req.params.content;
		const request = {
			input: { text: content },
			// Select the language and SSML voice gender (optional)
			voice: { languageCode: "en-AU", ssmlGender: "NEUTRAL" },
			// select the type of audio encoding
			audioConfig: { audioEncoding: "MP3" },
		};
		const [response] = await client.synthesizeSpeech(request);
		const id = uuidv4();

		const writeFile = util.promisify(fs.writeFile);
		await writeFile(`./../client/build/audio/${id}.mp3`, response.audioContent, "binary");
		console.log(`Audio content written to file: /client/build/audio/${id}.mp3`);

		res.json(`${id}.mp3`);
	} catch (error) {
		console.log(error);
		res.send(error);
	}
});

app.delete("/api/voice/delete/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const path = `./../client/build/audio/${id}`;

		const deleteFile = util.promisify(fs.unlink);
		await deleteFile(path);

		console.log(`Audio content delete from: /client/build/audio/${id}`);
	} catch (error) {
		console.log(error);
	}

	res.end();
});

app.use((req, res) => {
	res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => console.log(`Server started on port ${port}`));
