import React from "react";
import { BalanceContext } from 'contexts/Balance'

const useWebsocket = () => {
  const { setBalance } = React.useContext(BalanceContext);

  React.useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = ({ data }: MessageEvent) => {
      console.log(data);

      try {
        const { balance } = JSON.parse(data);

        setBalance(balance);
      } catch (e) {
        // Error handling
      }
    };
  }, []);

  return <></>;
};

export default useWebsocket;
