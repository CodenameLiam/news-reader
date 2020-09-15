import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Explore from "./Pages/Explore";
import Home from "./Pages/Home";

export default function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/explore" component={Explore} />
					<Route path="/" component={Home} />
				</Switch>
			</Router>
		</div>
	);
}
