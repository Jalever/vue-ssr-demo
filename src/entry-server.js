import { createApp } from './main'


export default ctx => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp();
    router.push(ctx.url);
    
    router.onReady(() => { 
      const machedComponents = router.getMatchedComponents();
      if (!machedComponents.length) reject({ code: 404 });
      
      resolve(app);
    }, reject);

  // return app;
  })
}