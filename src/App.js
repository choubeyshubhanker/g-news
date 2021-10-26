import "./App.css";
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 10;
  const apiKey = process.env.REACT_APP_NEWS_API; //My api key - use yours from newsapi

  const [progress, setProgress] = useState(0)


    return (
      <div>
        <Router>
          <LoadingBar
            color="#f11946"
            height={3.5}
            progress={progress}
          />
          <NavBar />
          <Switch>
          <Redirect exact from="/g-news" to="/" />
            <Route exact path="/">
              
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="general"
                pageSize={pageSize}
                country="any"

              />
            </Route>
            <Route exact path="/india">
              
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="business"
                pageSize={pageSize}
                country="in"
              />
            </Route>
            <Route exact path="/unitedstates">
              
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="entertainment"
                pageSize={pageSize}
                country="us"
              />
            </Route>
            <Route exact path="/unitedkingdom">
              
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="general"
                pageSize={pageSize}
                country="gb"
              />
            </Route>
            <Route exact path="/pakistan">
              
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="health"
                pageSize={pageSize}
                country="pk"
              />
            </Route>
            <Route exact path="/singapore">
              
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="science"
                pageSize={pageSize}
                country="sg"
              />
            </Route>
            
            <Route exact path="/australia">
              
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="technology"
                pageSize={pageSize}
                country="au"
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );

}
export default App;