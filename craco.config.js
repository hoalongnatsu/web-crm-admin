const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@Contants": path.resolve(__dirname, "src/utils/contants/"),
      "@Contexts": path.resolve(__dirname, "src/utils/contexts/"),
      "@Core": path.resolve(__dirname, "src/core/"),
      "@CoreComponents": path.resolve(__dirname, "src/core/components/"),
      "@Configs": path.resolve(__dirname, "src/core/configs/"),
      "@Helpers": path.resolve(__dirname, "src/utils/helpers/"),
      "@Pages": path.resolve(__dirname, "src/pages/"),
      "@Store": path.resolve(__dirname, "src/store/"),
      "@Utils": path.resolve(__dirname, "src/utils/"),
    },
  },
};
