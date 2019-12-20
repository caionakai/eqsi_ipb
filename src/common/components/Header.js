import React from "react";
import { withRouter } from "react-router-dom";
import { Header, Menu, Button, Box } from "grommet";
import * as Icons from "grommet-icons";

function CustomHeader({ history }) {
  return (
    <Header background="brand">
      <Button icon={<Icons.Home />} hoverIndicator />

      <Box>
        <Button
          margin="small"
          onClick={() => {
            history.push(`/admin/companies/list`);
            history.go();
          }}
        >
          List Companies
        </Button>
      </Box>

      <Box>
        <Button
          margin="small"
          onClick={() => {
            history.push(`/admin/companies/register`);
            history.go();
          }}
        >
          Register Company
        </Button>
      </Box>

      <Box>
        <Button margin="small">Logout</Button>
      </Box>
    </Header>
  );
}

export default withRouter(CustomHeader);
