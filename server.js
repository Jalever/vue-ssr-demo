const Vue = require('vue');
const express = require("express");
const server = express();
const { createRenderer } = require('vue-server-renderer')
const app = require("./dist/server-bundle");


const renderer = createRenderer({
  template: require("fs").readFileSync("./index.html","utf-8")
});


server.use(express.static('dist'));


server.get("*", (req, res) => {
  const context = {
    title: 'hello',
    meta: `
      <meta charset="utf-8" //>
    `
  };

  renderer.renderToString(app.default(), context, (err, html) => {
    if (err) return res.status(500).end('Internal Server Error!')
    
    res.send(html);
  });
});


server.listen(8080, () => {
  // console.warn('server is listening at port: 8080');
  console.log('server is listening at port: 8080');
  console.log('\n');
  
});