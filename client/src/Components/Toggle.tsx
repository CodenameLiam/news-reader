import { Switch, withStyles } from "@material-ui/core";

export const Toggle = withStyles({
	switchBase: {
		color: "#dedede",
		"&$checked": {
			color: "#1c1e26",
		},
		"&$checked + $track": {
			backgroundColor: "#1c1e26",
		},
	},
	checked: {},
	track: {},
})(Switch);
