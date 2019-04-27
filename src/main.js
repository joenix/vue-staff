// Create Project using Staff
import Staff from "@cafee/staff";

// Import Registry
import { router, modules, components } from "./registry";

// Import App
import App from "./App.vue";

// Initialization
new Staff({
  /* Manifest */
}).then(({ Vue, Router, Vuex, Importz }, next) => {
  /* ======== Extention Code Here ======== */
  Vue.config.productionTip = false;

  // Register Modules
  components.length &&
    // Importz Components
    Importz(components, name =>
      // Vue Register Component
      Vue.component(`x-${name}`, () => import(`@component/${name}`))
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
        modules: { ...modules }
      }),

      // Render
      render: h => h(App)
    })

      // App Mount
      .$mount("#app")
  );
});
