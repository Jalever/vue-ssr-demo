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
  }

  createApp({
    url: req.url,
  }).then((app) => {
    renderer.renderToString(app, context, (err, html) => {
      if (err) return res.status(500).end('Internal Server Error!')

      res.send(html)
    })
  }).catch(err => res.status(404).end('Page Not Found!'));
})

server.listen(8080, () => {
  // console.warn('server is listening at port: 8080');
  console.log('server is listening at port: 8080')
  console.log('\n')
})
