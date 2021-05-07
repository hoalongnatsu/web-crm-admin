import cloneDeep from "lodash.clonedeep";
import messageEn from "@Utils/localization/en.json";
import pages from "@Pages";

export const defaultResource = {
  initiated: false,
  routes: [],
  message: {
    en: messageEn,
  },
  menus: [],
};

export const initResource = async () => {
  let resource = cloneDeep(defaultResource);

  for (let index = 0; index < pages.length; index++) {
    const page = pages[index];

    try {
      const { default: config } = require(`@Pages/${page}/bootstraps.js`);

      for (let j = 0; j < config.routes.length; j++) {
        let { path, exact, ...rest } = config.routes[j];
        path = `${config.baseUrl}${path}`;

        resource.routes.push({
          ...rest,
          page,
          exact: exact || false,
          path,
        });
      }

      resource.menus.push(config.menus);
    } catch (error) {
      console.log(error);
    }
  }

  resource.menus.sort((a, b) => a.order - b.order)

  resource.initiated = true;
  return resource;
};
