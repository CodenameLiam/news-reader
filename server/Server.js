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
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, "news-reader-key.json");

// Helper function to remove problem characters from search string
function replaceSearch(str) {
	const replace = { "’": "", "–": "", "-": "", "'": "", "!": "", "%": " perecent" };
	return str.replace(/[’,–,-,',!,%]/g, (m) => replace[m]);
}

// Helper function to seperate keywords
function getSearch(str) {
	return str.replace(" ", " AND ");
}

// Serve static assets built from the clientside
app.use(express.static("../client/build"));

// News endpoints
const guardianAPIKey = "b4238ea5-dcc6-4ea2-92d6-be291c59cd9b";
const newsAPIKey = "0f4e8edcce654d779a4315dab0be7e87";

// Get headlines matching a specific country
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

// Head all articles matching a specific search query
app.get("/api/news/everything", async (req, res) => {
	try {
		const { search } = req.query;

		const searchQ = search ? `&q=${getSearch(search)}` : "";

		const response = await axios.get(`https://newsapi.org/v2/everything?apiKey=${newsAPIKey}${searchQ}`);

		const data = response.data.articles.map((article) => {
			const { title, description, author, urlToImage, publishedAt } = article;
			return { title: title, description: description, author: author, imageURL: urlToImage, published: publishedAt };
		});

		return res.json(data);
	} catch (error) {
		return res.send(error);
	}
});

// Get guardian news sections (not in use)
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

// Get related news items based on a specific search query
app.get("/api/news/related", async (req, res) => {
	try {
		const { search, section, page } = req.query;

		const searchQ = search ? `&q=${replaceSearch(search)}` : "";
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
		console.log(error);
		return res.json(error);
	}
});

// Synthesize speach content and save to folder
app.get("/api/voice/get/:code/:name/:content", async (req, res) => {
	try {
		const { code, name, content } = req.params;

		if (content) {
			const languageCode = code ? code : "en-AU";
			const languageName = name ? `${languageCode}-Wavenet-${name}` : "en-AU-Wavenet-A";

			const request = {
				input: { text: decodeURI(content) },
				// Select the language and SSML voice gender (optional)
				voice: { languageCode: languageCode, name: languageName },
				// select the type of audio encoding
				audioConfig: { audioEncoding: "MP3" },
			};
			const [response] = await client.synthesizeSpeech(request);
			const id = uuidv4();

			const writeFile = util.promisify(fs.writeFile);
			await writeFile(`./../client/build/audio/${id}.mp3`, response.audioContent, "binary");
			console.log(`Audio content written to file: /client/build/audio/${id}.mp3`);

			// Return the mp3 name of the file
			res.json(`${id}.mp3`);
		} else {
			res.status(403).send("Please enter a valid content string");
		}
	} catch (error) {
		console.log(error);
		res.send(error);
	}
});

// Delete synthesized speach content based on a given ID
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

// Server content using react clientside
app.use((req, res) => {
	res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => console.log(`Server started on port ${port}`));
