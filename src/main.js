import Vue from 'vue'
import { sync} from 'vuex-router-sync'

import App from './App.vue'
import { createRouter } from './router/index'
import { createStore } from './store/index'
// import { sync } from 'rimraf'

// new Vue({
//   render: h => h(App)
// }).$mount('#app')

export function createApp() {
  const router = createRouter()
  const store = createStore()

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  })
  return { app, router, store }
}
