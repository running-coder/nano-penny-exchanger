import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageTransition from "react-router-page-transition";
import {
  FlameTheme,
  lightTheme,
  FlameGlobalStyles
} from "@lightspeed/flame/Core";
import { ThemeProvider } from "emotion-theming";

import IndexProvider from "contexts/index";
import Scanner from "hooks/useScanner";
import Websocket from "hooks/useWebsocket";
import IndexPage from "pages/.";
import HelpPage from "pages/Help";

import "./App.css";

const App: React.FunctionComponent = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <FlameTheme>
        <IndexProvider>
          <Scanner />
          <Websocket />
          <FlameGlobalStyles />
          <Router>
            <Route
              // @ts-ignore
              render={({ location }) => (
                <PageTransition>
                  <Switch location={location}>
                    <Route exact path="/" component={IndexPage} />
                    <Route path="/help" component={HelpPage} />
                  </Switch>
                </PageTransition>
              )}
            />
          </Router>
        </IndexProvider>
      </FlameTheme>
    </ThemeProvider>
  );
};

export default App;
