import React from "react";
import { Box, Flex } from "@lightspeed/flame/Core";
import { Divider } from "@lightspeed/flame/Divider";
import { IconHelp } from "@lightspeed/flame/Icon/Help";
import { Text, Heading3 } from "@lightspeed/flame/Text";

import Configuration from "components/Configuration";
import Layout from "components/Layout";
import Footer from "components/Footer";
import WalletStep from "components/steps/Wallet";
import BalanceStep from "components/steps/Balance";
import BlockchainStep from "components/steps/Blockchain";

interface Props {
  history: any;
}

const IndexPage: React.FunctionComponent<Props> = ({ history }) => {
  return (
    <Layout className="transition-item index-page">
      <Box>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Heading3 color="white">Nano Penny Exchanger</Heading3>
            <Text size="small">
              Transform your pocket change into some sweet Nanos
            </Text>
          </Box>

          <Box onClick={() => history.push({ pathname: "/help" })}>
            <IconHelp color="gray-100" size="1.5rem" />
          </Box>
        </Flex>
        <Divider color="gray-600" py={1} />
      </Box>

      <Flex width="100%" height="50%" alignItems="center">
        <WalletStep />
        <BalanceStep />
        <BlockchainStep />
      </Flex>

      <Footer />

      <Configuration />
    </Layout>
  );
};

export default IndexPage;
