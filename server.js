'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const port = Number(process.env.PORT) || 3000, root = path.join(__dirname, 'public');
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8' };
http.createServer((req, res) => {
  const requested = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const target = path.resolve(root, `.${requested}`);
  if (!target.startsWith(`${root}${path.sep}`)) return res.writeHead(403).end('Forbidden');
  fs.readFile(target, (err, data) => {
    if (err) return res.writeHead(err.code === 'ENOENT' ? 404 : 500).end('Not found');
    res.writeHead(200, {'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; style-src 'self'; script-src 'self'"});
    res.end(data);
  });
}).listen(port, () => console.log(`SecureText is running at http://localhost:${port}`));
