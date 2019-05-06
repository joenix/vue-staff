const Path = require("path");
const Axios = require("axios");

function resolve(dir) {
  return Path.resolve(__dirname, dir);
}

function env(vars) {
  return process.env[vars];
}

module.exports = {
  productionSourceMap: false,

  devServer: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://192.168.1.100:8080/",
        changeOrigin: true
      }
    }
  },

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [resolve("./src/sheet/variable.less")]
    }
  },

  css: {
    extract: true,
    modules: true,
    loaderOptions: {
      less: {
        javascriptEnabled: true
      },
      sass: {
        data: `@import "~@sheet/variable.scss";`
      }
    }
  },

  chainWebpack: config => {
    // Use Polyfill
    config.entry.app = ["babel-polyfill", resolve("src/main.js")];
    // Alias Name
    config.resolve.alias
      // node_modules
      .set("#", resolve("node_modules"))
      // src
      .set("@", resolve("src"))
      // module
      .set("@module", resolve("src/modules"))
      // component
      .set("@component", resolve("src/components"))
      // view
      .set("@view", resolve("src/views"))
      // sheet
      .set("@sheet", resolve("src/sheet"))
      // asset
      .set("@asset", resolve("src/assets"));
  },

  configureWebpack: config => {
    // Read GQL File
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader"
    });
  }
};
