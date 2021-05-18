import "./styles/app.scss";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-pluralrules/locale-data/en";

import React, { useEffect, useState } from "react";
import { defaultResource, themes } from "@Contants";

import BlockReserveLoading from "react-loadingg/lib/BlockReserveLoading";
import Header from "@CoreComponents/Header";
import { HelmetProvider } from "react-helmet-async";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import ResourceContext from "@Contexts/Resource";
import Routes from "@CoreComponents/Init/Routes";
import ThemeContext from "@Contexts/Theme";
import auth from "@Helpers/auth";
import configureStore from "@Store/configureStore";
import { initResource } from "@Helpers/initResource";

export const store = configureStore();

const App = () => {
  /* State */
  const [theme, setTheme] = useState(themes.light);
  const [resource, setResource] = useState(defaultResource);

  useEffect(() => {
    setResourceContext();
  }, []);

  const setResourceContext = () => {
    const authenticated = auth.authenticated();

    return initResource(authenticated).then((data) => {
      setResource(data);
      store.runSaga();
      return;
    });
  };

  const setThemeContext = (value) => {
    setTheme(value ? themes.dark : themes.light);
  };

  return resource.initiated ? (
    <Provider store={store}>
      <HelmetProvider>
        <IntlProvider
          locale="en"
          messages={resource.message.en}
          onError={(e) => console.log(e)}
        >
          <ResourceContext.Provider value={{ resource, setResourceContext }}>
            <ThemeContext.Provider value={{ theme, setThemeContext }}>
              <div className="app">
                <Header
                  menus={resource.menus}
                  authenticated={resource.authenticated}
                />
                <Routes
                  routes={resource.routes}
                  authenticated={resource.authenticated}
                />
              </div>
            </ThemeContext.Provider>
          </ResourceContext.Provider>
        </IntlProvider>
      </HelmetProvider>
    </Provider>
  ) : (
    <BlockReserveLoading />
  );
};

export default App;
