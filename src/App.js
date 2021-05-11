import "./styles/index.scss";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-pluralrules/locale-data/en";

import React, { useEffect, useState } from "react";
import { defaultResource, initResource } from "@Helpers/initResource";

import BlockReserveLoading from "react-loadingg/lib/BlockReserveLoading";
import Header from "@CoreComponents/Header";
import { HelmetProvider } from "react-helmet-async";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import Routes from "@CoreComponents/Init/Routes";
import ThemeContext from "@Contexts/Theme";
import configureStore from "@Store/configureStore";
import { themes } from "@Contants";

export const store = configureStore();

const App = () => {
  /* State */
  const [theme, setTheme] = useState(themes.light);
  const [resource, setResource] = useState(defaultResource);

  useEffect(() => {
    initResource().then((data) => {
      setResource(data);
      store.runSaga();
    });
  }, []);

  const toggle = (value) => {
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
          <ThemeContext.Provider value={{ theme, toggle }}>
            <div className="app">
              <Header menus={resource.menus} />
              <Routes routes={resource.routes} />
            </div>
          </ThemeContext.Provider>
        </IntlProvider>
      </HelmetProvider>
    </Provider>
  ) : (
    <BlockReserveLoading />
  );
};

export default App;
