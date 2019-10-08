import React from "react";
import { Box, Flex } from "@lightspeed/flame/Core";
import { Divider } from "@lightspeed/flame/Divider";
import { Text, Heading1 } from "@lightspeed/flame/Text";

import Layout from "components/Layout";
import Footer from "components/Footer";

import WalletStep from "./steps/Wallet";
import BalanceStep from "./steps/Balance";
import BlockchainStep from "./steps/Blockchain";

const Welcome: React.FunctionComponent = () => {
  return (
    <Layout>
      <Box>
        <Heading1>Nano Penny Exchanger</Heading1>
        <Text>Transform your pocket change into some sweet Nanos</Text>
        <Text>Only Canadian coins are accepted: 2$, 1$, 25¢, 10¢, 5¢</Text>
        <Divider color="gray-600" py={2} />
      </Box>

      <Flex width="100%" height="50%" alignItems="center">
        <WalletStep />
        <BalanceStep />
        <BlockchainStep />
      </Flex>

      <Footer />
    </Layout>
  );
};

export default Welcome;
