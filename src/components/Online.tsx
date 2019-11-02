import React from "react";
import { Flex } from "@lightspeed/flame/Core";

const Online = () => {
  const [isOnline, setIsOnline] = React.useState<boolean>(navigator.onLine);

  const sendOnlineStatus = (isOnline: boolean) => {
    window.ipcRenderer.send("online-status-changed", isOnline);
  };

  React.useEffect(() => {
    window.addEventListener("load", function() {
      window.ipcRenderer.send("start-app");

      sendOnlineStatus(isOnline);

      function updateOnlineStatus() {
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
      <img
        src="offline.png"
        alt="offline"
        width="80%"
        style={{
          filter: "brightness(100%) sepia(1) saturate(1) hue-rotate(160deg)"
        }}
      />
    </Flex>
  ) : null;
};

export default Online;
