import http from 'http';

const server = http.createServer((req, res) => {
  console.log('Request received!', req.url);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('pong');
});

export default server;
