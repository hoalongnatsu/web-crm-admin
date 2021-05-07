import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { Menu } from "antd";
import ThemeContext from "@Contexts/Theme";
import useTranslate from "@Core/hooks/useTranslate";

const { SubMenu } = Menu;

const Header = ({ menus = [] }) => {
  const t = useTranslate();
  const { theme } = useContext(ThemeContext);

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

  return (
    <header className={theme.name} style={{ background: theme.background }}>
      <div className="logo"></div>
      <Menu mode="horizontal" theme={theme.name}>{menus.map(renderMenu)}</Menu>
      <div className="setting"></div>
    </header>
  );
};

export default Header;
