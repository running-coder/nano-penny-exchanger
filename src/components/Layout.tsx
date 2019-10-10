import React from "react";
import { Flex } from "@lightspeed/flame/Core";

// @ts-ignore
const Layout = ({ children, ...rest }) => (
  <Flex
    px={2}
    flexDirection="column"
    justifyContent="space-between"
    style={{ height: "100%" }}
    {...rest}
  >
    {children}
  </Flex>
);

export default Layout;
