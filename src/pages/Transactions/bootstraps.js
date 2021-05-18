const config = {
  name: "Transactions",
  baseUrl: "/transactions",
  routes: [
    {
      path: "",
      subpage: "Home",
      title: "Transactions Page",
      reducer: {
        name: "transactions",
        resource: "transactions"
      },
    }
  ],
  menus: {
    order: 1,
    submenu: "transactions",
    items: [
      {
        key: "transactions",
        to: "/transactions"
      },
    ]
  },
  requireAuthenticated: true
}

export default config;
