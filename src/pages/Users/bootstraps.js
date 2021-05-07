const config = {
  name: "Users",
  baseUrl: "/users",
  routes: [
    {
      path: "",
      subpage: "Home",
      title: "Users Page",
      exact: true,
      reducer: {
        name: "users",
        resource: "users"
      },
    },
    {
      path: "/create",
      subpage: "Create",
      title: "Create User",
    }
  ],
  menus: {
    order: 0,
    submenu: "users",
    items: [
      {
        key: "users",
        to: "/users"
      },
      {
        key: "create-user",
        to: "/users/create"
      },
      {
        submenu: "user-info",
        items: [
          {
            key: "user-info",
            to: "/users/info"
          },
        ]
      }
    ]
  }
}

export default config;
