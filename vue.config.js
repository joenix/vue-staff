const Path = require("path");

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
        target: process.env.proxy,
        pathRewrite: {
          "^/api": "/"
        },
        changeOrigin: true
      },
      "/mock": {
        target: "http://localhost:3000/",
        pathRewrite: {
          "^/mock": "/"
        },
        changeOrigin: true
      }
    }
  },

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        resolve("./src/sheet/skin/ant-design.less"),
        resolve("./src/sheet/variable/index.less")
      ]
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
        data: `@import "~@sheet/skin/element-ui.scss";`
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
      // i18n
      .set("@i18n", resolve("src/i18n"))
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
