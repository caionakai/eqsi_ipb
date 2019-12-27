import React from "react";
import { withRouter } from "react-router-dom";
import { Header, Menu, Button, Box, Anchor } from "grommet";
import { logout } from "../utils/logout";

function CustomHeader({ history, menus, homeLink, brandLabel }) {
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
      <Box margin="small">
        <Anchor
          // icon={<Icons.Home />}
          focusIndicator={false}
          color="light-1"
          label={brandLabel}
          onClick={() => {
            history.push(homeLink);
            history.go();
          }}
        />
      </Box>

      <Box direction="row-responsive">
        {renderMenus()}
        <Box>
          <Button margin="small" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Box>
    </Header>
  );
}

export default withRouter(CustomHeader);
