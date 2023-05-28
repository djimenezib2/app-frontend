import { createApp } from 'vue';
import { createStore } from 'vuex';

import App from './App.vue';
import router from './router.js';

const store = createStore({
  state() {
    return {
      userRole: '',
    };
  },
});

const app = createApp(App);

app.use(store);

app.use(router);

app.mount('#app');

export default store;
