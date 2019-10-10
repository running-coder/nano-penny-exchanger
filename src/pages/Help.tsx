import React from "react";
import QRCode from "qrcode";

import { Box } from "@lightspeed/flame/Core";
import { Divider } from "@lightspeed/flame/Divider";
import { Group } from "@lightspeed/flame/Group";
import { IconChevronLeft } from "@lightspeed/flame/Icon/ChevronLeft";
import { Text, Heading1 } from "@lightspeed/flame/Text";

import Layout from "components/Layout";
import Footer from "components/Footer";

interface Props {
  history: any;
}

const HelpPage: React.FunctionComponent<Props> = ({ history }) => {
  React.useEffect(() => {
    var canvasNano = document.getElementById("canvas-nano");
    var canvasNatrium = document.getElementById("canvas-natrium");

    QRCode.toCanvas(canvasNano, "https://nano.org/en", {
      margin: 2,
      width: 50
    });

    QRCode.toCanvas(canvasNatrium, "https://natrium.io/", {
      margin: 2,
      width: 50
    });
  }, []);

  return (
    <Layout className="transition-item help-page">
      <Box>
        <Group alignItems="center">
          <Box onClick={() => history.push({ pathname: "/" })}>
            <IconChevronLeft color="gray-100" size="1.5rem" />
          </Box>
          <Box>
            <Heading1>Additional information</Heading1>
            {/* <Text>Transform your pocket change into some sweet Nanos</Text> */}
          </Box>
        </Group>
        <Divider color="gray-600" py={2} />
      </Box>

      <Box px={2}>
        <Text pb={2}>
          Drop in your pocket change and obtain nano directly into your wallet,
          how simple can this be?
        </Text>
        <Box pb={2}>
          <Group>
            <Text>
              Nano is a decentralized, sustainable, and secure next-generation
              digital currency. Designed to solve peer to peer transfer of
              value, Nano is an ultrafast and fee-less network that is open to
              everyone.
            </Text>
            <canvas id="canvas-natrium"></canvas>
          </Group>
        </Box>
        <Box pb={2}>
          <Group>
            <Text>
              If you don't have a nano wallet yet, we recomment downloading the
              Natrium.
            </Text>
            <canvas id="canvas-nano"></canvas>
          </Group>
        </Box>

        <Text>Only Canadian coins are accepted: 2$, 1$, 25¢, 10¢, 5¢</Text>
      </Box>

      <Footer />
    </Layout>
  );
};

export default HelpPage;
