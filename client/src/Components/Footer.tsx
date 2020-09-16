import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiPlay, mdiPause, mdiSkipNext, mdiSkipPrevious, mdiLoading } from "@mdi/js";
import moment from "moment";

interface IFooter {
	onPrevious: () => void;
	onNext: () => void;
	onToggle: () => void;
	playing: boolean;
	audio?: string;
	progress: number;
	duration: number;
}

export default function Footer(props: IFooter) {
	const [icon, setIcon] = useState(getIcon);
	const { playing, audio, progress, duration } = props;

	useEffect(() => {
		setIcon(getIcon);
	}, [playing, audio]);

	return (
		<div className="footer">
			<div className="container">
				<div className="previous" onClick={() => props.onPrevious()}>
					<Icon className="previous" path={mdiSkipPrevious} size="4rem" color="#1c1e26" />
				</div>

				<div
					className="control-container"
					onClick={() => {
						props.onToggle();
						setIcon(getIcon);
					}}>
					<Icon path={icon} size="4rem" color="#dedede" spin={icon == mdiLoading} />
				</div>
				<div className="next" onClick={() => props.onNext()}>
					<Icon className="next" path={mdiSkipNext} size="4rem" color="#1c1e26" />
				</div>
			</div>
			<div className="timer">
				<div className="progress-time">{getTime(Math.floor(progress))}</div>
				<div className="progress-bar">
					<div className="progress-complete" style={{ width: `${(progress / duration) * 100}%` }} />
				</div>
				<div className="progress-time">{getTime(Math.floor(duration))}</div>
			</div>
		</div>
	);

	function getTime(seconds: number) {
		return moment().startOf("day").seconds(seconds).format("mm:ss");
	}

	function getIcon() {
		const { playing, audio } = props;
		if (playing && audio) {
			return mdiPause;
		} else if (playing && !audio) {
			return mdiLoading;
		} else {
			return mdiPlay;
		}
	}
}
