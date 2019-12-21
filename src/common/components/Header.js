import React from "react";
import { withRouter } from "react-router-dom";
import { Header, Menu, Button, Box } from "grommet";
import * as Icons from "grommet-icons";

function CustomHeader({ history, menus, homeLink }) {
  const renderMenus = () =>
    menus.map(menu => (
      <Menu
        key={menu.name}
        label={menu.name}
        items={menu.items.map(item => ({
          label: item.name,
          onClick: () => {
            history.push(item.link);
            history.go();
          }
        }))}
      />
    ));
  return (
    <Header background="brand">
      <Button
        icon={<Icons.Home />}
        hoverIndicator
        onClick={() => {
          history.push(homeLink);
          history.go();
        }}
      />

      <Box direction="row-responsive">
        {renderMenus()}
        <Box>
          <Button margin="small">Logout</Button>
        </Box>
      </Box>
    </Header>
  );
}

export default withRouter(CustomHeader);
