import { startBot, stopBot } from './bot.js';
import { startServer, stopServer } from './server.js';

startServer();
startBot();

process.once('SIGINT', () => {
  stopServer();
  stopBot('SIGINT');
});

process.once('SIGTERM', () => {
  stopServer();
  stopBot('SIGTERM');
});
