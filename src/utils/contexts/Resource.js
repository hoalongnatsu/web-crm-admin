import React from "react";
import { defaultResource } from "@Contants";

export default React.createContext({
  resource: defaultResource,
  setResourceContext: () => {}
});
