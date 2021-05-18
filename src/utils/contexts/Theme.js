import React from "react";
import { themes } from "@Contants";

export default React.createContext({
  theme: themes.light,
  setThemeContext: () => {}
});
