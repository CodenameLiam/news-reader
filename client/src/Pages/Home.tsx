import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Toggle } from "../Components/Toggle";
import { TextBox } from "../Components/TextBox";
import { SearchButton } from "../Components/Button";
import Article, { IArticle } from "../Components/Article";
import { FormControlLabel } from "@material-ui/core";

import axios from "axios";
import { Animated } from "react-animated-css";

import ReactFlagsSelect from "react-flags-select";
import "react-flags-select/scss/react-flags-select.scss";

import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import SearchIcon from "@material-ui/icons/Search";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Gets articles from the server-side
function useArticles(country: string, search: string) {
	const [articles, setArticles] = useState<IArticle[]>([]);
	useEffect(() => {
		if (search) {
			axios
				.get(`./api/news/everything?search=${search}`)
				.then((d) => setArticles(d.data))
				.catch((e) => alert("Cloud not load articles"));
		} else {
			axios
				.get(`./api/news/headlines?country=${country}${getSearch(search)}`)
				.then((d) => setArticles(d.data))
				.catch((e) => alert("Cloud not load articles"));
		}
	}, [country, search]);

	return articles;
}

// Helper function to return the correct search parameters
function getSearch(search: string) {
	return search.length > 0 ? `&search=${encodeURIComponent(search)}` : "";
}

export default function Home() {
	const history: any = useHistory();
	const location: any = useLocation();

	// User input
	const [country, setCountry] = useState("AU");
	const [search, setSearch] = useState("");
	const [voice, setVoice] = useState({
		code: getVoice("code", "AU"),
		name: getVoice("name", "A"),
	});

	// Get state of voice over
	function getVoice(type: string, result: string) {
		if (location.state) return location.state[type] ? location.state[type] : result;
		return result;
	}

	// Get articles, set current article, slide and animation
	const articles: IArticle[] = useArticles(country, search);
	const [loading, setLoading] = useState(true);
	const [currentArticle, setCurrentArticle] = useState(articles[0]);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [animateVisible, setAnimateVisible] = useState(false);

	// Set audio and playing state
	const [audio, setAudio] = useState<string | undefined>(undefined);
	const [playing, setPlaying] = useState(false);

	// Set progress and duration state
	const [progress, setProgress] = useState(0);
	const [duration, setDuration] = useState(0);

	// Set autoplay state
	const [autoPlay, setAutoplay] = useState(true);

	// Respond to articles changing
	useEffect(() => {
		cleanUp();
		// Animate articles in/out
		setAnimateVisible(articles.length > 0);
		// Set the current slide to 0 if articles are set
		setCurrentSlide(0);
		// Set the current article
		if (articles.length > 0) {
			setCurrentArticle(articles[currentSlide!]);
		}
	}, [articles]);

	// Respond to slide changing
	useEffect(() => {
		cleanUp();
		// Remove audio files
		cleanUpAudio();
		// Set the current article
		setCurrentArticle(articles[currentSlide!]);
	}, [currentSlide]);

	// Respond to article changing
	useEffect(() => {
		// If we are playing sound, get the next speech content for the current article
		if (playing) {
			textToSpeech(`${currentArticle.title}. ${currentArticle.description}`);
		}
	}, [currentArticle]);

	useEffect(() => {
		// If we are playing sound and do not yet have a current audio file loaded,
		// get the next speech content for the current article
		if (playing && !audio) {
			textToSpeech(`${currentArticle.title}. ${currentArticle.description}`);
		}
	}, [playing]);

	// Clean up state after slide/article change
	function cleanUp() {
		// Reset the player time
		setDuration(0);
		// Reset the player progress
		setProgress(0);
		// Reset the current audio file
		setAudio(undefined);
	}

	// Convert text to audio
	async function textToSpeech(text: string) {
		// let response = await axios.get(`./api/voice/get/${text}`);
		let response = await axios.get(`./api/voice/get/en-${voice.code}/${voice.name}/${encodeURI(text)}`);
		if (response.status == 200) {
			setAudio(response.data);
		} else {
			toast.error("Could not play audio");
		}
	}

	// Delete audio file
	async function cleanUpAudio() {
		if (audio) {
			await axios.delete(`./api/voice/delete/${audio}`);
		}
	}

	function handleKeyPress(e: any) {
		if (e.key == "Enter") {
			handleSearch(e.target.value);
		}
	}

	function handleSearch(value: string) {
		setAnimateVisible(false);
		setSearch(value);
	}

	// Render articels and return an error if they fail to load
	function renderArticles() {
		if (Array.isArray(articles)) {
			return articles.map((article: IArticle, index: number) => {
				return (
					<Slide key={index} index={index}>
						<Article key={article.title} article={article} />
					</Slide>
				);
			});
		} else {
			if (loading) {
				setLoading(false);
				toast.error("Could not load articles");
			}
			return;
		}
	}

	return (
		<div className="home">
			<Header displayBack={false} changeVoice={(code, name) => setVoice({ code: code, name: name })} />
			<div className="content">
				<div className="auto-play">
					<FormControlLabel
						control={<Toggle checked={autoPlay} onChange={() => setAutoplay(!autoPlay)} name="checkedA" />}
						label="Auto Play"
						labelPlacement="start"
					/>
				</div>

				<div className="input-fields">
					<div className="country-select">
						<div className="text">Top Articles From:</div>
						<ReactFlagsSelect
							defaultCountry="AU"
							countries={["AU", "GB", "US", "IE"]}
							onSelect={(code) => {
								setAnimateVisible(false);
								setCountry(code);
							}}
						/>
					</div>
					<div className="search">
						<div className="text">Keywords:</div>
						<TextBox placeholder="i.e. Technology" onKeyPress={(e) => handleKeyPress(e)} />
					</div>
				</div>
				<div className="carousel-container">
					<Animated
						animationIn="fadeInUp"
						animationOut="fadeOutDown"
						animationInDuration={1000}
						animationOutDuration={1000}
						isVisible={animateVisible}>
						<CarouselProvider
							naturalSlideWidth={100}
							naturalSlideHeight={100}
							totalSlides={articles.length}
							visibleSlides={1}
							currentSlide={currentSlide}
							dragEnabled={false}>
							<Slider>{loading ? renderArticles() : <></>}</Slider>
						</CarouselProvider>
						{articles.length > 0 ? (
							<div className="button-container">
								<SearchIcon style={{ color: "#ffffff" }} />
								<SearchButton onClick={() => routeExplore()}>Explore This Story</SearchButton>
							</div>
						) : (
							<></>
						)}
					</Animated>
				</div>
				{audio ? (
					<audio
						id="audio"
						autoPlay
						onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
						onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
						onEnded={() => audioFinished()}
						src={`${process.env.PUBLIC_URL}/audio/${audio}`}
					/>
				) : (
					<></>
				)}
			</div>
			<Footer
				onPrevious={() => setCurrentSlide(previousSlide(currentSlide!))}
				onNext={() => setCurrentSlide(nextSlide(currentSlide!, articles.length))}
				onToggle={() => toggle()}
				playing={playing}
				audio={audio}
				progress={progress}
				duration={duration}
			/>
			<ToastContainer />
		</div>
	);

	// Go to the explore page
	function routeExplore() {
		const title = currentArticle ? currentArticle.title : articles[0].title;
		history.push({ pathname: "/explore", state: { title: title, code: voice.code, name: voice.name } });
	}

	// Toggle the playing state of the audio file
	function toggle() {
		setPlaying(!playing);

		// If audio is loaded, merely toggle play/pause
		if (audio) {
			const audioElement: any = document.getElementById("audio");
			try {
				playing ? audioElement.pause() : audioElement.play();
			} catch (error) {
				console.log(error);
			}
			// Otherwise set the new current article, which will fetch new speech content
		} else {
			setCurrentArticle(articles[currentSlide!]);
		}
	}

	// Decide what will happen after an article has finished output
	function audioFinished() {
		autoPlay ? autoPlayNext() : autoPlayHalt();
	}

	// Play the next article
	function autoPlayNext() {
		setCurrentSlide(nextSlide(currentSlide!, articles.length));
	}

	// Halt playing
	function autoPlayHalt() {
		setAudio(undefined);
		setPlaying(false);
		cleanUpAudio();
	}
}

function previousSlide(currentSlide: number) {
	if (currentSlide > 0) {
		return currentSlide - 1;
	}
	return currentSlide;
}

function nextSlide(currentSlide: number, maxLength: number) {
	if (currentSlide < maxLength) {
		return currentSlide + 1;
	}
	return currentSlide;
}
