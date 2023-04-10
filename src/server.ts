import http, { IncomingMessage, ServerResponse } from 'http';

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse): void => {
    console.log('Request received!', req.url);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('pong');
  }
);

export default server;
