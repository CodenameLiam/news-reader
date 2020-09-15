import { TextField, withStyles } from "@material-ui/core";

export const TextBox = withStyles({
	root: {
		"& .MuiInput-underline:before": {
			borderBottomColor: "#dedede",
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "#1c1e26",
		},
	},
})(TextField);

// 1c1e26
