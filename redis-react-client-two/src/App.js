import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import URLShortener from "./urlShortener"
import AllLinks from "./allLinks"
import "./main.scss"

const App = () => {
  return (
    <Router>
      <div className="app-wrapper">
        <div className="navigation">
			<div className="for-flex">
          <Link to="/">URL Shortener</Link>
          <Link to="/all-links">All Links</Link>
		  </div>
        </div>

        <Switch>
          <Route exact path="/">
            <URLShortener />
          </Route>
          <Route path="/all-links">
            <AllLinks />
          </Route>
        </Switch>
      </div>
    </Router>

  )
}

export default App
