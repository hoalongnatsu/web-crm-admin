const config = {
  name: "Authentication",
  baseUrl: "",
  routes: [
    {
      path: "/login",
      subpage: "Login",
      title: "Login",
      exact: true,
    }
  ],
  requireAuthenticated: false
}

export default config;
