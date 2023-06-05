import { createApp } from "vue";
import { createStore } from "vuex";

import App from "./App.vue";
import router from "./router.js";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { fas } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(fas);

const store = createStore({
  state() {
    return {
      userRole: "",
    };
  },
});

const app = createApp(App);

app.use(store);

app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");

export default store;
