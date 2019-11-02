import React from "react";
import { Flex } from "@lightspeed/flame/Core";

const Online = () => {
  const [isOnline, setIsOnline] = React.useState<boolean>(navigator.onLine);

  const sendOnlineStatus = (status: boolean) => {
    // @ts-ignore
    window.ipcRenderer.send(
      "online-status-changed",
      status ? "online" : "offline"
    );
  };

  React.useEffect(() => {
    window.addEventListener("load", function() {
      // @ts-ignore
      window.ipcRenderer.send("start-app");
      sendOnlineStatus(isOnline);

      function updateOnlineStatus() {
        console.log("isOnline", isOnline);

        sendOnlineStatus(navigator.onLine);
        setIsOnline(navigator.onLine);
      }

      window.addEventListener("online", updateOnlineStatus);
      window.addEventListener("offline", updateOnlineStatus);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !isOnline ? (
    <Flex
      alignItems="center"
      justifyContent="center"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 10001,
        background: "#464a51"
      }}
    >
      <img src="offline.png" alt="offline" width="80%" />
    </Flex>
  ) : null;
};

export default Online;
