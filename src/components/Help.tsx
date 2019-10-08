import React from "react";
// @ts-ignore
import QRCode from "qrcode";
import { Box } from "@lightspeed/flame/Core";
import { Text } from "@lightspeed/flame/Text";

import Layout from "components/Layout";
import Footer from "components/Footer";

const colorizeWallet = (wallet: string): React.ReactNode => (
  <>
    <span style={{ color: "blue" }}>
      {wallet.substr(wallet.length * -1, wallet.length - 60 + 7)}
    </span>
    <span>{wallet.substr(-53, 46)}</span>
    <span style={{ color: "blue" }}>{wallet.substr(-7)}</span>
  </>
);

const Help: React.FunctionComponent = () => {
  React.useEffect(() => {
    var canvas = document.getElementById("canvas");

    QRCode.toCanvas(canvas, "https://nano.org/en", function(error: Error) {
      if (error) console.error(error);
      console.log("success!");
    });
  }, []);

  return (
    <Layout>
      <Box>
        <Text>What is nano?</Text>

        <canvas id="canvas"></canvas>
      </Box>

      <Footer />
    </Layout>
  );
};

export default Help;
