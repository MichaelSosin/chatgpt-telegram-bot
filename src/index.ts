import { Context } from 'telegraf';
import { message } from 'telegraf/filters';
import bot from './bot.js';
import { getChatResponse } from './openai.js';
import server from './server.js';

server.listen(process.env.PORT || 8080, () => {
  console.log('Server started!!');
});

bot.start((ctx: Context) => {
  const { from } = ctx.message;
  console.log('New user:', ctx.from);
  ctx.reply(`Welcome, @${from.username}!`);
});

bot.on(message('text'), async (ctx) => {
  const { from, text } = ctx.message;

  console.log(`Message from @${from.username}: ${text}`);
  console.log('Message ended');

  try {
    console.log('Sending request to OpenAI...');

    const response = await getChatResponse(text);
    console.log('OpenAI response: ', response);
    console.log('Response ended');

    ctx.reply(response);
  } catch (error) {
    console.warn('Error: ', error);

    ctx.reply('Error occured!');
  }
});

bot.launch().then(() => {
  console.log('Bot started!');
});

process.once('SIGINT', () => {
  server.close();
  bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
  server.close();
  bot.stop('SIGTERM');
});
