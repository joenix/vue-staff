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
    host: env("HOST")
  },

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [resolve("./public/variable.less")]
    }
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  chainWebpack: config => {
    // Use Polyfill
    config.entry.app = ["babel-polyfill", resolve("src/main.js")];
    // Alias Name
    config.resolve.alias
      // src
      .set("@", resolve("src"))
      // module
      .set("@module", resolve("src/modules"))
      // component
      .set("@component", resolve("src/components"))
      // view
      .set("@view", resolve("src/views"))
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
