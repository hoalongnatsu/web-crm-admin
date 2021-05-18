import React, { Suspense, lazy, useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router";

import ErrorBoundary from "@CoreComponents/ErrorBoundary";
import { Helmet } from "react-helmet-async";
import TopBarProgress from "react-topbar-progress-indicator";
import { store } from "@/App";

TopBarProgress.config({
  barColors: {
    0: "#FF5F6D",
    "1.0": "#FF5F6D",
  },
});

const LoadableLoading = ({ delay = 300 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  return show && <TopBarProgress />;
};

const RouteWithTitle = ({ exact, title, path, page, subpage, reducer }) => {
  const lazyComponent = lazy(() =>
    import(
      /* webpackChunkName: "[request]" */
      `@Pages/${page}/subpages/${subpage}`
    ).then(async (component) => {
      if (reducer) {
        const module = await import(
          /* webpackChunkName: "[request]" */
          `@Pages/${page}/reducers/${reducer.resource}`
        );

        store.addReducer(reducer.name, module.default);
      }
      return component;
    })
  );

  return (
    <ErrorBoundary>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Route exact={exact} path={path} component={lazyComponent} />
    </ErrorBoundary>
  );
};

const Routes = ({ routes, authenticated }) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      if (authenticated) {
        history.push("/users");
      }
    }
  }, [authenticated, history, location]);

  return (
    <Suspense fallback={<LoadableLoading />}>
      <Switch>
        {routes.map((route) => (
          <RouteWithTitle key={route.path} {...route} />
        ))}
        {authenticated ? (
          <RouteWithTitle
            path="*"
            title="Not Found"
            page="System"
            subpage="NotFound"
          />
        ) : (
          <Route path="*" render={(props) => <Redirect {...props} to="/login" />} />
        )}
      </Switch>
    </Suspense>
  );
};

Routes.defaultProps = {
  routes: [],
};

export default Routes;
