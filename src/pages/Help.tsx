import React from "react";
import QRCode from "qrcode";

import { Box } from "@lightspeed/flame/Core";
import { Divider } from "@lightspeed/flame/Divider";
import { Group } from "@lightspeed/flame/Group";
import { IconChevronLeft } from "@lightspeed/flame/Icon/ChevronLeft";
import { Text, Heading3 } from "@lightspeed/flame/Text";

import Layout from "components/Layout";

interface Props {
  history: any;
}

const HelpPage: React.FunctionComponent<Props> = ({ history }) => {
  React.useEffect(() => {
    var canvasNano = document.getElementById("canvas-nano");
    var canvasNatrium = document.getElementById("canvas-natrium");

    QRCode.toCanvas(canvasNano, "https://nano.org/en", {
      margin: 1,
      width: 70
    });

    QRCode.toCanvas(canvasNatrium, "https://natrium.io/", {
      margin: 1,
      width: 70
    });
  }, []);

  return (
    <Layout className="transition-item help-page" justifyContent="flex-start">
      <Box pt={1}>
        <Group alignItems="center">
          <Box onClick={() => history.push({ pathname: "/" })}>
            <IconChevronLeft color="gray-100" size="1.5rem" />
          </Box>
          <Box>
            <Heading3 color="white">Additional informations</Heading3>
          </Box>
        </Group>
        <Divider color="gray-600" py={1} />
      </Box>

      <Text size="small" pb={1}>
        Drop in your pocket change and obtain nano directly into your wallet,
        how simple can this be?
      </Text>
      <Box pb={1}>
        <Group>
          <Text size="small">
            Nano is a decentralized, sustainable, and secure next-generation
            digital currency. Designed to solve peer to peer transfer of value,
            Nano is an ultrafast and fee-less network that is open to everyone.
          </Text>
          <canvas id="canvas-natrium"></canvas>
        </Group>
      </Box>
      <Box pb={1}>
        <Group>
          <canvas id="canvas-nano"></canvas>
          <Text size="small">
            If you don't have a nano wallet yet, we recomment downloading the
            Natrium.
          </Text>
        </Group>
      </Box>
      <Box pb={1}>
        <Text size="small">
          Only Canadian coins are accepted: 2$, 1$, 25¢, 10¢, 5¢
        </Text>
      </Box>

      <Text size="small">
        No fees are taken, you are purchasing at market price
      </Text>
    </Layout>
  );
};

export default HelpPage;
