import React from "react";
import { Box, Flex } from "@lightspeed/flame/Core";
import { Divider } from "@lightspeed/flame/Divider";
import { Text } from "@lightspeed/flame/Text";

import Package from "../../package.json";
import { PriceContext } from "contexts/Price";
import { RateContext } from "contexts/Rate";

const Footer: React.FunctionComponent = () => {
  const [price] = React.useContext(PriceContext);
  const [rate] = React.useContext(RateContext);

  return (
    <Box pb={2}>
      <Divider color="gray-600" py={2} />
      <Flex width="100%">
        <Box width="33%">
          <Text>$ {price}</Text>
          <Text fontSize="0.825rem" color="gray-500">
            Nano USD market price
          </Text>
        </Box>
        <Box width="33%" textAlign="center">
          <Text>{rate}</Text>
          <Text fontSize="0.825rem" color="gray-500">
            1$ USD/CAD rate
          </Text>
        </Box>
        <Box
          width="33%"
          color="gray-500"
          alignSelf="flex-end"
          fontSize="0.825rem"
          textAlign="right"
        >
          v{Package.version}
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
