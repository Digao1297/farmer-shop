import Vue from "vue";
import App from "./app.vue";
import "./services/pwa/registerServiceWorker";
import { router, store, vuetify } from "./services";

import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
