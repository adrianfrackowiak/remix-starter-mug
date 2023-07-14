const { withEsbuildOverride } = require("remix-esbuild-override");
const styledComponentsPlugin = require("./styled-components-esbuild-plugin");

withEsbuildOverride((option) => {
  option.plugins.unshift(styledComponentsPlugin());

  return option;
});


/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: ['swiper', 'swiper/react', 'swiper/css', 'styled-components'],
  server: process.env.NODE_ENV === "development" ? undefined : "./server.ts",
  serverModuleFormat: "cjs",
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  serverBuildPath: "build/index.js",
  publicPath: "/build/",
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
};
