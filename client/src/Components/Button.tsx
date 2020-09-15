import { withStyles, Button } from "@material-ui/core";

export const SearchButton = withStyles({
	root: {
		background: "#1c1e26",
		borderRadius: 100,
		// padding: "0.5rem",
		height: "58px",
		width: "18rem",
		color: "white",
		fontSize: "1rem",
		fontFamily: "'Poppins', sans-serif",
		textTransform: "none",
		// boxShadow: '-2px 4px 4px -2px rgba(113,210,245,0.5), -1px 2px 2px 0px rgba(113,210,245, 0.14), 0px 1px 5px 0px rgba(113,210,245,0.12)',

		"&:hover": {
			background: "#1c1e26",
			boxShadow: "0 0 15px rgba(100, 100, 100, 0.5)",
		},
	},
})(Button);
