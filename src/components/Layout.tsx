import React from "react";
import { Flex } from "@lightspeed/flame/Core";

const Layout: React.FunctionComponent = ({ children }) => (
  <Flex
    px={2}
    flexDirection="column"
    justifyContent="space-between"
    style={{ height: "100%" }}
  >
    {children}
  </Flex>
);

export default Layout;
