module.exports = {
  apps: [
    {
      name: 'chatgpt-telegram-bot',
      script: 'dist/index.js',
      watch: true,
      node_args: '-r dotenv/config',
    },
  ],
};
