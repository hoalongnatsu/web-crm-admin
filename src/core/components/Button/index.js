import React, { useContext } from "react";
import { Button } from "antd";
import ThemeContext from "@Contexts/Theme";

const CoreButton = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return <Button style={{ theme }}>{children}</Button>;
};

export default CoreButton;
