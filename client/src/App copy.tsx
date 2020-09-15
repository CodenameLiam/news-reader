import React, { useEffect, useState } from "react";
import axios from "axios";
import { prependListener } from "process";
// interface IArticle {
// 	author: string;
// 	title: string;
// 	description: string;
// 	url: string;
// 	urlToImage: string;
// 	publishedAt: string;
// 	content: string;
// }

interface IArticle {
	headline: string;
	byline: string;
	lastModified: string;
	thumbnail: string;
	body: any;
}

export default function App() {
	const [articles, setArticles] = useState<IArticle[]>([]);
	// const [audio, setAudio] = useState(new Audio());
	// const [playing, setPlaying] = useState(false);
	// const [id, setId] = useState("");

	useEffect(() => {
		axios.get("./api/guardian").then((d) => setArticles(d.data));
	}, []);

	// async function playAll() {
	// 	articles.forEach(async (article) => {
	// 		let response = await axios.get(`./api/voice/${article.headline}`);

	// 		setId(response.data);
	// 		setAudio(new Audio(`${process.env.PUBLIC_URL}/audio/${response.data}`));
	// 		setPlaying(true);

	// 		console.log(`Playing ${response.data}`);
	// 	});
	// }

	return (
		<div className="App">
			Test
			{/* <button onClick={() => playAll()}>PLAY ALL</button> */}
			{articles.map((article: any, index: number) => {
				return <Article key={index} article={article} />;
			})}
		</div>
	);
}

// const useAudio = () => {};

function Article(props: { article: IArticle }) {
	// const [audio, setAudio] = useState(new Audio());
	const [playing, setPlaying] = useState(false);
	const [audio, setAudio] = useState<string | undefined>(undefined);
	// const [playing, setPlaying] = useState(false);

	const { article } = props;
	const temp = document.createElement("div");
	temp.innerHTML = article.body;
	article.body = temp.textContent;

	async function audioComplete() {
		// setPlaying(false);
		await axios.delete(`./api/voice/delete/${audio}`);
		setAudio(undefined);
		// setURL(undefined);
		console.log("Deleted");
	}

	return (
		<div className="article">
			<p>{article.headline}</p>
			<img src={article.thumbnail} />
			{audio ? (
				<audio
					id="audio"
					controls
					autoPlay
					onTimeUpdate={(e) => test(e)}
					onPlay={() => setPlaying(true)}
					onPause={() => setPlaying(false)}
					// onLoadedMetadata={(e) => test(e)}
					// onPlaying={(e) => console.log(e)}
					// onChange={(e) => console.log(e)}
					onEnded={() => audioComplete()}
					src={`${process.env.PUBLIC_URL}/audio/${audio}`}
				/>
			) : (
				<></>
			)}

			<button onClick={(e) => toggle(e)}>{playing ? "PAUSE" : "PLAY"}</button>
			<button onClick={() => textToSpeech(article.body)}>READ FULL STORY</button>
			<p>{article.body}</p>
		</div>
	);

	async function toggle(e: any) {
		e.stopPropagation();
		if (audio) {
			// await audioComplete();
			const audioElement: any = document.getElementById("audio");
			try {
				playing ? audioElement.pause() : audioElement.play();
			} catch (error) {
				console.log(error);
			}
		} else {
			textToSpeech(article.headline);
		}
	}

	function test(e: any) {
		console.log(Math.floor(e.currentTarget.currentTime));
	}

	async function textToSpeech(text: string) {
		let response = await axios.get(`./api/voice/get/${text}`);
		setAudio(response.data);
		// setURL(`${process.env.PUBLIC_URL}/audio/${response.data}`);
		// setAudio(new Audio(`${process.env.PUBLIC_URL}/audio/${response.data}`));
		// setPlaying(true);
	}
}

const useAudio = (url: string | undefined) => {
	// console.log("Playing");
	const [audio] = useState(new Audio(url));
	const [playing, setPlaying] = useState(false);

	const toggle = () => setPlaying(!playing);

	useEffect(() => {
		playing ? audio.play() : audio.pause();
	}, [playing]);

	useEffect(() => {
		audio.addEventListener("ended", () => console.log("Ended"));
		return () => {
			audio.removeEventListener("ended", () => console.log("Ended"));
			// location.reload(true);
		};
	}, []);

	return [playing, toggle];
};
