import http, { IncomingMessage, ServerResponse } from 'http';

const requestListener = (req: IncomingMessage, res: ServerResponse): void => {
  console.log('Request received!', req.url);

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('pong');
};

const _server = http.createServer(requestListener);

export const startServer = (): void => {
  _server.listen(process.env.PORT || 3000, () => {
    console.log('Server started!!');
  });
};

export const stopServer = (): void => {
  _server.close();
};
