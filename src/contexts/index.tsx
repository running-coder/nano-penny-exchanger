import React from "react";
import StepProvider from "./Step";
import PriceProvider from "./Price";
import RateProvider from "./Rate";
import WalletProvider from "./Wallet";
import BalanceProvider from "./Balance";
import HashProvider from "./Hash";
import IsSubscribedProvider from "./IsSubscribed";
import IsConfirmedProvider from "./IsConfirmed";
import ConfigurationProvider from "./Configuration";
import ServerErrorProvider from "./ServerError";

const IndexProvider: React.FunctionComponent = ({ children }) => {
  return (
    <StepProvider>
      <PriceProvider>
        <RateProvider>
          <WalletProvider>
            <BalanceProvider>
              <HashProvider>
                <IsSubscribedProvider>
                  <IsConfirmedProvider>
                    <ServerErrorProvider>
                      <ConfigurationProvider>{children}</ConfigurationProvider>
                    </ServerErrorProvider>
                  </IsConfirmedProvider>
                </IsSubscribedProvider>
              </HashProvider>
            </BalanceProvider>
          </WalletProvider>
        </RateProvider>
      </PriceProvider>
    </StepProvider>
  );
};

export default IndexProvider;
