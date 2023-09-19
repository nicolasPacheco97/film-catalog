const http = require('node:http') // protocolo http

const desiredPort = 3001

const server = http.createServer((req, res) => {
  console.log('request recived', req.url)
  if (req.url === '/') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('🚀Esta es la página de inicio')
  }
})

server.listen(desiredPort, () => {
  console.log(`server started into port ${desiredPort}`)
})
