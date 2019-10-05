import React from "react";
import {
  FlameTheme,
  lightTheme,
  FlameGlobalStyles
} from "@lightspeed/flame/Core";
import { ThemeProvider } from "emotion-theming";
import BalanceProvider from "contexts/Balance";
import Welcome from "components/Welcome";
// import "./App.css";

const App: React.FunctionComponent = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <FlameTheme>
        <BalanceProvider>
          <FlameGlobalStyles />
          <Welcome />
        </BalanceProvider>
      </FlameTheme>
    </ThemeProvider>
  );
};

export default App;
