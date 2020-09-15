import React from "react";
import Icon from "@mdi/react";
import { mdiNewspaper, mdiCog } from "@mdi/js";

interface IHeader {
	changeVoice: () => void;
}

export default function Header(props: IHeader) {
	return (
		<div className="header">
			<Icon className="logo" path={mdiNewspaper} color="#ffffff" />
			News <b>Reader</b>
			<div className="settings">
				<Icon path={mdiCog} color="#ffffff" />
			</div>
		</div>
	);
}
