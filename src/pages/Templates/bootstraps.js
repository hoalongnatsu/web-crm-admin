const config = {
  name: "Templates",
  baseUrl: "/templates",
  routes: [
    {
      path: "/product/detail",
      subpage: "Product/Detail",
      title: "Product Detail Template",
    }
  ],
  menus: {
    order: 2,
    submenu: "templates",
    items: [
      {
        key: "templates-product-detail",
        to: "/templates/product/detail"
      },
    ]
  },
  requireAuthenticated: true
}

export default config;
