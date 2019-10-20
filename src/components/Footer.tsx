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
    <Box pb={1}>
      <Divider color="gray-600" py={1} />
      <Flex width="100%" justifyContent="space-between">
        <Box width="33%">
          {/* <Text>{rate}</Text>
          <Text fontSize="0.825rem" color="gray-500">
            USD/CAD rate
          </Text> */}
          {/* <Text>${price}</Text>
          <Text fontSize="0.825rem" color="gray-500">
            Nano/USD
          </Text> */}
        </Box>

        <Box width="33%" textAlign="center">
          <Text>${(price * rate).toFixed(8)}</Text>
          <Text fontSize="0.825rem" color="gray-500">
            Nano/CAD
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
