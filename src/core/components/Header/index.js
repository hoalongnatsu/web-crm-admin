import { Button, Menu } from "antd";
import React, { useContext } from "react";

import { Link } from "react-router-dom";
import ResourceContext from "@Contexts/Resource";
import ThemeContext from "@Contexts/Theme";
import auth from "@Helpers/auth";
import { clear_admin_info } from "@Store/actions/admin";
import useTranslate from "@Core/hooks/useTranslate";

const { SubMenu } = Menu;

const Header = ({ menus = [], authenticated }) => {
  const t = useTranslate();
  const { theme } = useContext(ThemeContext);
  const { setResourceContext } = useContext(ResourceContext);

  const renderMenu = (menu) => {
    return (
      <SubMenu key={menu.submenu} title={t(`menu:${menu.submenu}`)}>
        {menu.items.map((item) =>
          item.items ? (
            renderMenu(item)
          ) : (
            <Menu.Item key={item.key}>
              <Link to={item.to}>{t(`menu:${item.key}`)}</Link>
            </Menu.Item>
          )
        )}
      </SubMenu>
    );
  };

  const onLogout = () => {
    clear_admin_info();
    auth.clearAuthInfo();
    setResourceContext();
  }

  return authenticated ? (
    <header className={theme.name} style={{ background: theme.background }}>
      <div className="logo"></div>
      <Menu mode="horizontal" theme={theme.name}>{menus.map(renderMenu)}</Menu>
      <div className="setting">
        <Button type="text" onClick={onLogout}>Logout</Button>
      </div>
    </header>
  ) : null;
};

export default Header;
