import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageTransition from "react-router-page-transition";
import {
  FlameTheme,
  lightTheme,
  FlameGlobalStyles
} from "@lightspeed/flame/Core";
import { ThemeProvider } from "emotion-theming";

import StepProvider from "contexts/Step";
import PriceProvider from "contexts/Price";
import RateProvider from "contexts/Rate";
import WalletProvider from "contexts/Wallet";
import BalanceProvider from "contexts/Balance";
import HashProvider from "contexts/Hash";
import IsSubscribedProvider from "contexts/IsSubscribed";
import IsConfirmedProvider from "contexts/IsConfirmed";

import Scanner from "hooks/useScanner";
import Websocket from "hooks/useWebsocket";
import IndexPage from "pages/.";
import HelpPage from "pages/Help";

import "./App.css";

const App: React.FunctionComponent = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <FlameTheme>
        <StepProvider>
          <PriceProvider>
            <RateProvider>
              <WalletProvider>
                <BalanceProvider>
                  <HashProvider>
                    <IsSubscribedProvider>
                      <IsConfirmedProvider>
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
                      </IsConfirmedProvider>
                    </IsSubscribedProvider>
                  </HashProvider>
                </BalanceProvider>
              </WalletProvider>
            </RateProvider>
          </PriceProvider>
        </StepProvider>
      </FlameTheme>
    </ThemeProvider>
  );
};

export default App;
