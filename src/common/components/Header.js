import React from "react";
import { Header, Menu, Button, Box } from "grommet";
import * as Icons from "grommet-icons";

function CustomHeader() {
  return (
    <Header background="brand">
      <Button icon={<Icons.Home />} hoverIndicator />
      <Box>
        <Button margin="small">Logout</Button>
      </Box>
    </Header>
  );
}

export default CustomHeader;
