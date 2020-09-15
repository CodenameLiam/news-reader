import moment from "moment";
import React from "react";

export interface IArticle {
	title: string;
	description: string;
	author: string;
	imageURL: string;
	published: any;
}

export default function Article(props: { article: IArticle }) {
	let { title, description, imageURL, author, published } = props.article;

	return (
		<div className="article">
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
				<div className="article-footer">
					<div className="author">{author}</div>
					<div className="published">{moment(published).format("ddd Do MMMM YYYY")}</div>
				</div>
			</div>
		</div>
	);
}
