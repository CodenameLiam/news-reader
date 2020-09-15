import React, { useEffect, useState } from "react";
import Header from "../Components/Header";

import axios from "axios";
import { Animated } from "react-animated-css";
import Article, { IArticle } from "../Components/Article";

interface IExplore {
	location: { state?: { title?: string } };
}

// Gets articles from the server-side
function useArticles(search: string) {
	const [articles, setArticles] = useState<IArticle[]>([]);
	useEffect(() => {
		axios
			.get(`./api/news/?search=${search}`)
			.then((d) => setArticles(d.data))
			.catch((e) => alert("Cloud not load articles"));
	}, [search]);
	return articles;
}

export default function Explore(props: IExplore) {
	const { state } = props.location;
	const query = state ? state.title : "";
	const articles: IArticle[] = useArticles(query!);

	const [animateVisible, setAnimateVisible] = useState(false);

	// Respond to articles changing
	useEffect(() => {
		// Animate articles in/out
		setAnimateVisible(articles.length > 0);
	}, [articles]);

	return (
		<div className="explore">
			<Header changeVoice={() => {}} />
			<Animated
				animationIn="fadeInLeft"
				animationOut="fadeOutRight"
				animationInDuration={1000}
				animationOutDuration={1000}
				isVisible={animateVisible}>
				{articles.map((article: IArticle, index: number) => {
					const removeTags = document.createElement("div");
					removeTags.innerHTML = article.description;
					article.description = removeTags.textContent!;
					return <Article key={article.title} article={article} />;
				})}
			</Animated>
			{props.location.state ? props.location.state.title : ""}
			explore
		</div>
	);
}
