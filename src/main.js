// Create Project using Staff
import Staff from "@cafee/staff";

// Import Registry
import { router, modules, components, i18n } from "./registry";

// Import Utils
import { log, exceptor, language, interceptor } from "./utils";

// Use Ant
import Ant from "ant-design-vue";

// Import App
import App from "./App.vue";

// Initialization
new Staff({
  /* Manifest */
})

  // Initialize Vue
  .then(
    // Start
    ({ Vue, Router, Vuex, Importz, Axios, I18n, Console, Global }, next) => {
      /**
       * Extention Code Here
       * ======== ======== ========
       */
      Vue.config.productionTip = false;

      /**
       * Vue Useable
       * ======== ======== ========
       */

      // Ant Design
      Vue.use(Ant);

      /**
       * Kit Transform
       * ======== ======== ========
       */

      // Console
      Global.Console = new log();

      // Exceptor
      exceptor(Global);

      // Language
      Vue.prototype.$lang = language;

      // HTTP Interceptor
      Vue.prototype.$http = interceptor(
        // Axe
        Axios,

        // Configure
        {
          // Proposal /api/
          baseURL: "",
          // Out Time
          timeout: 8000
        },

        // Request Transform
        (data, header) => {
          console.log("Request ===>", data, "Header ===>", header);
        },

        // Response Transform
        response => {
          console.log("Response ===>", response);
        },

        // Error Transform
        error => (Global.Console.error(error), error)
      );

      /**
       * Part Registry
       * ======== ======== ========
       */

      // Components
      Importz(components, name =>
        // Register
        Vue.component(`x-${name}`, () => import(`@component/${name}`))
      );

      // Modules
      const $module = Importz(
        modules,
        (
          name,
          cip,
          // Get Module Set
          mod = require(`@module/${name}`).default(Vue.prototype.$http)
        ) => (
          // Use Namespaced
          (mod.namespaced = true),
          // Return
          cip(mod)
        )
      );

      // I18n
      const $i18n = new I18n({
        // Language
        locale: language,
        // Infomation
        messages: Importz(i18n, (name, cip) =>
          // Collection
          cip(require(`@i18n/${name}`))
        )
      });

      // Router
      const $router = new Router({
        // Router Mode
        mode: "history",
        // Base Uri
        base: process.env.BASE_URL,
        // Routes
        routes: [
          /* Rtouer Configure */
          ...router
        ]
      });

      // Store
      const $store = new Vuex.Store({
        // Name Space
        namespaced: true,
        // Use Modules
        modules: { ...$module }
      });

      /**
       * Vue Instance
       * ======== ======== ========
       */
      const $vue = new Vue({
        // Router
        router: $router,
        // Store
        store: $store,
        // i18n
        i18n: $i18n,
        // Render
        render: h => h(App)
      });

      // Mount
      $vue.$mount("#app");

      /**
       * Transfer
       * ======== ======== ========
       */
      return $vue;
    }
  )

  // End
  .finally(v => Console.info("vue-staff is running ."));
