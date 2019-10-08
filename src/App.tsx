import React from "react";
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
import Scanner from "hooks/useScanner";
import Websocket from "hooks/useWebsocket";
import Welcome from "components/Welcome";
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
                  <Scanner />
                  <Websocket />
                  <FlameGlobalStyles />
                  <Welcome />
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
