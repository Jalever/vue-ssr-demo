const Vue = require('vue')
const express = require('express')
const server = express()
const { createRenderer } = require('vue-server-renderer')
const createApp = require('./dist/server-bundle').default
// const { createApp } = require('./src/main')
const renderer = createRenderer({
  template: require('fs').readFileSync('./index.html', 'utf-8'),
})

server.use(express.static('dist'))
server.use('/dist', express.static('dist'))

server.get('*', (req, res) => {
  const context = {
    title: 'hello',
    meta: `
      <meta charset="utf-8" //>
    `,
    url: req.url
  }

  createApp(context).then((app) => {
    renderer.renderToString(app, context, (err, html) => {
      if (err) {
        if (err.code === 404) {
           res.status(404).end('Page not found')
         } else {
           res.status(500).end('Internal Server Error')
         }
         return
      }

      res.send(html)
    })
  }).catch(err => {
    console.warn('err');
    console.log(err);
    console.log('\n');
    
    res.status(404).end('Page Not Found!')
  });
})

server.listen(8080, () => {
  // console.warn('server is listening at port: 8080');
  console.log('server is listening at port: 8080')
  console.log('\n')
})
