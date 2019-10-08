import React from "react";
import { BalanceContext } from "contexts/Balance";
import { PriceContext } from "contexts/Price";
import { RateContext } from "contexts/Rate";

const useWebsocket = () => {
  const [, setBalance] = React.useContext(BalanceContext);
  const [, setPrice] = React.useContext(PriceContext);
  const [, setRate] = React.useContext(RateContext);

  React.useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = ({ data }: MessageEvent) => {
      try {
        const { price, rate, balance } = JSON.parse(data);

        if (balance) {
          setBalance(balance);
        } else if (price) {
          setPrice(price);
        } else if (rate) {
          setRate(rate);
        }
      } catch (e) {
        // Error handling
      }
    };

    ws.onopen = () => {
      ws.send(JSON.stringify({ method: "getPrice" }));
      ws.send(JSON.stringify({ method: "getRate" }));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default useWebsocket;
