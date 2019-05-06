// Create Project using Staff
import Staff from "@cafee/staff";

// Import Registry
import { router, modules, components } from "./registry";

// Import App
import App from "./App.vue";

// Import CSS Variables
import "@sheet/variable.css";

// Initialization
new Staff({
  /* Manifest */
}).then(({ Vue, Router, Vuex, Importz }, next) => {
  /* ======== Extention Code Here ======== */
  Vue.config.productionTip = false;

  // Register Components
  components.length &&
    // Importz
    Importz(components, name =>
      // Register
      Vue.component(`x-${name}`, () => import(`@component/${name}`))
    );

  // Register Modules
  const Mods =
    // Length
    modules.length &&
    // Importz
    Importz(modules, (name, cip) =>
      // Collection
      cip(require(`@module/${name}`))
    );

  // Running
  next(
    // Instantiation
    new Vue({
      // Router
      router: new Router({
        // Router Mode
        mode: "history",
        // Base Uri
        base: process.env.BASE_URL,
        // Routes
        routes: [
          /* Rtouer Configure */
          ...router
        ]
      }),

      // Store
      store: new Vuex.Store({
        // Name Space
        namespaced: true,
        // Use Modules
        modules: { ...Mods }
      }),

      // Render
      render: h => h(App)
    })

      // App Mount
      .$mount("#app")
  );
});
