import React, { useEffect, useState } from "react";
import Header from "../Components/Header";

import axios from "axios";
import { Animated } from "react-animated-css";
import { IArticle } from "../Components/Article";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { PlayButton, SearchButton } from "../Components/Button";
import { Icon } from "@mdi/react";
import { mdiLoading, mdiPause, mdiPlay } from "@mdi/js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IExplore {
	location: { state?: { title?: string; code?: string; name?: string } };
}

// Gets articles from the server-side
function useArticles(search: string) {
	const [articles, setArticles] = useState<IArticle[]>([]);
	useEffect(() => {
		axios
			.get(`./api/news/related?search=${encodeURIComponent(search)}`)
			.then((d) => setArticles(d.data))
			.catch(() => {
				alert("Cloud not load articles");
			});
	}, [search]);
	return articles;
}

export default function Explore(props: IExplore) {
	const location: any = useLocation();

	const [voice, setVoice] = useState({
		code: getVoice("code", "AU"),
		name: getVoice("name", "A"),
	});

	// Get state of voice over
	function getVoice(type: string, result: string) {
		if (location.state) return location.state[type] ? location.state[type] : result;
		return result;
	}

	const articles: IArticle[] = useArticles(location.state.title);
	const [loading, setLoading] = useState(true);

	const [animateVisible, setAnimateVisible] = useState(false);

	// Respond to articles changing
	useEffect(() => {
		// Animate articles in/out
		setAnimateVisible(articles.length > 0);
	}, [articles]);

	// Render articels and return an error if they fail to load
	function renderArticles() {
		if (Array.isArray(articles)) {
			return articles.map((article: IArticle) => {
				const temp = document.createElement("div");
				temp.innerHTML = article.body!;
				article.body = temp.textContent!;
				return <ExploreArticle key={article.title} article={article} voiceCountryCode={voice.code} voiceName={voice.name} />;
			});
		} else {
			if (loading) {
				setLoading(false);
				alert("Could no load articles");
			}
			return;
		}
	}

	return (
		<div className="explore">
			<Header displayBack={true} changeVoice={(code, name) => setVoice({ code: code, name: name })} />
			<div className="explore-headline">
				<b>From article: {props.location.state ? props.location.state.title : ""}</b>
			</div>
			<Animated
				animationIn="fadeInLeft"
				animationOut="fadeOutRight"
				animationInDuration={1000}
				animationOutDuration={1000}
				isVisible={animateVisible}>
				{loading ? renderArticles() : <></>}
			</Animated>
		</div>
	);
}

function ExploreArticle(props: { article: IArticle; voiceCountryCode: string; voiceName: string }) {
	let { title, description, imageURL, author, published } = props.article;
	// Set progress and duration state
	const [progress, setProgress] = useState(0);
	const [duration, setDuration] = useState(0);

	// Set audio and playing state
	const [audio, setAudio] = useState<string | undefined>(undefined);
	const [playing, setPlaying] = useState(false);
	const [icon, setIcon] = useState(mdiPlay);

	useEffect(() => {
		setIcon(getIcon());
	}, [playing, audio]);

	function getTime(seconds: number) {
		return moment().startOf("day").seconds(seconds).format("mm:ss");
	}

	// Convert text to audio
	async function textToSpeech(text: string) {
		let response = await axios.get(`./api/voice/get/en-${props.voiceCountryCode}/${props.voiceName}/${text}`);
		if (response.status == 200) {
			setAudio(response.data);
		} else {
			toast.error("Could not play audio");
		}
	}

	async function finishListening() {
		if (audio) {
			await axios.delete(`./api/voice/delete/${audio}`);
		}
		setProgress(0);
		setDuration(0);
		setPlaying(false);
		setAudio(undefined);
	}

	async function listenToFullStory(e: any) {
		e.stopPropagation();
		finishListening();
		setIcon(mdiLoading);
		const temp = document.createElement("div");
		temp.innerHTML = props.article.body!;
		const body = temp.textContent;

		let response = await axios.get(`./api/voice/get/en-${props.voiceCountryCode}/${props.voiceName}/${encodeURI(body!)}`);
		if (response.status == 200) {
			setAudio(response.data);
			const audioElement: any = document.getElementById(`audio-${audio}`);
			try {
				playing ? audioElement.pause() : audioElement.play();
			} catch (error) {
				console.log(error);
				toast.error("Could not play audio");
			}
		} else {
			toast.error("Could not play audio");
		}
	}

	function getIcon() {
		if (playing && audio) {
			return mdiPause;
		} else if (playing && !audio) {
			return mdiLoading;
		} else {
			return mdiPlay;
		}
	}

	function toggle(e: any) {
		e.stopPropagation();
		setPlaying(!playing);
		if (audio) {
			const audioElement: any = document.getElementById(`audio-${audio}`);
			try {
				playing ? audioElement.pause() : audioElement.play();
			} catch (error) {
				console.log(error);
			}
		} else {
			textToSpeech(`${title}. ${description}`);
		}
	}

	return (
		<div className="article" onClick={(e) => toggle(e)}>
			<div className="container">
				<div className="image-container">
					{imageURL ? (
						<img src={imageURL} alt="Article Image" />
					) : (
						<div className="fail-container">
							<div className="image-fail">No image exists for this article</div>
						</div>
					)}
				</div>
				<div className="text">
					<div className="title">{title}</div>
					<div className="description">{description}</div>
				</div>
				<div className="media">
					<div className="button-container">
						<SearchButton onClick={(e) => listenToFullStory(e)}>Listen To Full Story</SearchButton>
					</div>
					<div className="timer">
						<div className="progress-time">{getTime(Math.floor(progress))}</div>
						<div className="progress-bar">
							<div className="progress-complete" style={{ width: `${(progress / duration) * 100}%` }} />
						</div>
						<div className="progress-time">{getTime(Math.floor(duration))}</div>
					</div>
				</div>
				<div className="article-footer">
					<div className="author">
						{author}, {moment(published).format("ddd Do MMMM YYYY")}
					</div>
				</div>
			</div>
			<div className="play-button" onClick={(e) => toggle(e)}>
				<PlayButton>
					<Icon path={icon} size="4rem" color="#ffffff" spin={icon == mdiLoading} />
				</PlayButton>
			</div>
			{audio ? (
				<audio
					id={`audio-${audio}`}
					autoPlay
					onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
					onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
					onEnded={() => finishListening()}
					src={`${process.env.PUBLIC_URL}/audio/${audio}`}
				/>
			) : (
				<></>
			)}
			<ToastContainer />
		</div>
	);
}
