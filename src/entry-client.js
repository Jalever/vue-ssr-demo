import { createApp } from './main'

// 客户端特定引导逻辑……

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  // 这里假定 App.vue 模板中根元素具有 id="app"
  app.$mount('#app')

  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    let diffed = false
    let activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c)
    })

    if (!activated.length) return next();


    Promise.all(activated.map(c => {
      if (c.asyncData) {
        console.warn('fetch data in client side');
        console.log('fetch data in client side');
        console.log('\n');
        return c.asyncData({store, route: to});
      }
    })).then(() => next()).catch(next);
  })
})
