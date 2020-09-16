import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiNewspaper, mdiCog, mdiCheckCircle, mdiCheckboxBlankCircleOutline, mdiChevronLeft } from "@mdi/js";
// import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import ReactFlagsSelect from "react-flags-select";
import { SearchButton } from "./Button";
import { Animated } from "react-animated-css";
import { useHistory, useLocation } from "react-router-dom";

interface IHeader {
	displayBack: boolean;
	changeVoice: (code: string, name: string) => void;
}

interface IOptions {
	value: string;
	display: string;
	url: string;
	gender: "Male" | "Female";
}
const options: any = {
	AU: [
		{ value: "A", display: "Sally", url: "au-a.wav", gender: "Female" },
		{ value: "B", display: "Tim", url: "au-b.wav", gender: "Male" },
		{ value: "C", display: "Amelia", url: "au-c.wav", gender: "Female" },
		{ value: "D", display: "John", url: "au-d.wav", gender: "Male" },
	],
	US: [
		{ value: "A", display: "Wendy", url: "us-a.wav", gender: "Male" },
		{ value: "B", display: "Mark", url: "us-b.wav", gender: "Male" },
		{ value: "C", display: "Trish", url: "us-c.wav", gender: "Female" },
		{ value: "D", display: "Hunter", url: "us-d.wav", gender: "Male" },
		{ value: "E", display: "Allison", url: "us-e.wav", gender: "Female" },
		{ value: "F", display: "Karen", url: "us-f.wav", gender: "Female" },
		{ value: "G", display: "Fiona", url: "us-g.wav", gender: "Female" },
	],
	GB: [
		{ value: "A", display: "Hannah", url: "uk-a.wav", gender: "Female" },
		{ value: "B", display: "Greg", url: "uk-b.wav", gender: "Male" },
		{ value: "C", display: "Chrstine", url: "uk-c.wav", gender: "Female" },
		{ value: "D", display: "Paul", url: "uk-d.wav", gender: "Male" },
		{ value: "E", display: "Tina", url: "uk-e.wav", gender: "Female" },
		{ value: "F", display: "David", url: "uk-f.wav", gender: "Male" },
	],
};

export default function Header(props: IHeader) {
	const history = useHistory();
	const location: any = useLocation();

	const [state, setState] = useState({
		code: getVoice("code", "AU"),
		name: getVoice("name", "A"),
	});

	// Get state of voice over
	function getVoice(type: string, result: string) {
		if (location.state) return location.state[type] ? location.state[type] : result;
		return result;
	}

	const [popup, showPopup] = useState(false);

	return (
		<div className="header">
			{props.displayBack ? (
				<div className="back-button" onClick={() => history.push({ pathname: "/", state: { code: state.code, name: location.state.name } })}>
					<Icon path={mdiChevronLeft} color="#ffffff" />
				</div>
			) : (
				<></>
			)}
			<Icon className="logo" path={mdiNewspaper} color="#ffffff" />
			<div className="title">
				News <b>Reader</b>
			</div>

			<div className="settings-button" onClick={() => showPopup(true)}>
				<Icon path={mdiCog} color="#ffffff" />
			</div>
			{popup ? (
				<div className="settings-container">
					<Animated animationIn="pulse" animationOut="bounceOut" animationInDuration={400} animationOutDuration={400} isVisible={popup}>
						<div className="settings">
							<h2>Settings</h2>
							<div className="input">
								<div className="country-select">
									<div className="text">Select Voice From: </div>
									<ReactFlagsSelect
										defaultCountry={state.code}
										countries={["AU", "GB", "US"]}
										onSelect={(code) => {
											setState({ code: code, name: "A" });
										}}
									/>
								</div>
								{options[state.code].map((option: IOptions) => {
									return (
										<div className="voice-entry">
											<div className="select" onClick={() => setState({ ...state, name: option.value })}>
												<Icon
													className="logo"
													path={option.value == state.name ? mdiCheckCircle : mdiCheckboxBlankCircleOutline}
												/>
												<span>{option.display}</span>
											</div>

											<audio controls src={`${process.env.PUBLIC_URL}/preview/${option.url}`} />
										</div>
									);
								})}
							</div>

							<div className="buttons">
								<SearchButton
									onClick={() => {
										showPopup(false);
									}}>
									Cancel
								</SearchButton>
								<SearchButton
									onClick={() => {
										props.changeVoice(state.code, state.name);
										showPopup(false);
									}}>
									Save
								</SearchButton>
							</div>
						</div>
					</Animated>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
