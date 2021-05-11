import { CURRENT_ENV } from "@Core/configs/env";
import a from "axios";

const axios = a.create({ baseURL: CURRENT_ENV.API_URL });

const auth = a.create({ baseURL: CURRENT_ENV.API_URL });
auth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["token"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default class BaseService {
  init(prefix, useAuth) {
    this.prefix = prefix;
    this.useAuth = useAuth;
    return this;
  }

  callWithParams(method, url, params, options, useAuth, usePrefix = true) {
    if (useAuth || this.useAuth) {
      return auth[method](usePrefix ? `${this.prefix}${url}` : url, {
        params,
        ...options,
      }).then(({ data }) => data);
    }

    return axios.get(usePrefix ? `${this.prefix}${url}` : url, {
      params,
      ...options,
    }).then(({ data }) => data);
  }

  callWithBody(method, url, body, options, useAuth, usePrefix = true) {
    if (useAuth || this.useAuth) {
      return auth[method](usePrefix ? `${this.prefix}${url}` : url, body, options).then(({ data }) => data);
    }

    return axios[method](usePrefix ? `${this.prefix}${url}` : url, body, options).then(({ data }) => data);
  }

  get(url, params, useAuth, options, usePrefix = true) {
    return this.callWithParams("get", url, params, options, useAuth, usePrefix = true)
  }

  post(url, body, useAuth, options, usePrefix = true) {
    return this.callWithBody("post", url, body, options, useAuth, usePrefix = true);
  }

  put(url, body, useAuth, options, usePrefix = true) {
    return this.callWithBody("put", url, body, options, useAuth, usePrefix = true);
  }

  delete(url, params, useAuth, options, usePrefix = true) {
    return this.callWithParams("delete", url, params, options, useAuth, usePrefix = true)
  }
}
