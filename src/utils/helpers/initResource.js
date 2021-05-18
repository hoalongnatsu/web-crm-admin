import cloneDeep from "lodash.clonedeep";
import { defaultResource } from "@Contants";
import pages from "@Pages";
import pathHelper from "@Helpers/path";

export const initResource = async (authenticated) => {
  /**
   * @var {resource}
   * @property {initiated} // init state of application
   * @property {routes} // array router and page component of application
   * @property {message} // translate
   * @property {menu} // menu of appli cation
   * @property {authenticated} // check user have authenticated yet
   * Ex value:
   * let resource = {
      initiated: false,
      routes: [],
      message: {
        en: messageEn,
      },
      menus: [],
      authenticated: false,
    };
  */
  let resource = cloneDeep(defaultResource);

  for (let index = 0; index < pages.length; index++) {
    const page = pages[index];

    try {
      const { default: config } = require(`@Pages/${page}/bootstraps.js`);

      if (
        config.requireAuthenticated === "any" ||
        config.requireAuthenticated === undefined ||
        config.requireAuthenticated === authenticated
      ) {
        for (let j = 0; j < config.routes.length; j++) {
          let { path, exact, ...rest } = config.routes[j];
          path = `${pathHelper.trim(config.baseUrl)}/${pathHelper.trim(path)}`;
          path = pathHelper.trim(path);
          path = `/${path}`;

          resource.routes.push({
            ...rest,
            page,
            exact: exact || false,
            path,
          });
        }

        if (config.menus) {
          resource.menus.push(config.menus);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  resource.menus.sort((a, b) => a.order - b.order);

  resource.initiated = true;
  resource.authenticated = authenticated;
  return resource;
};
