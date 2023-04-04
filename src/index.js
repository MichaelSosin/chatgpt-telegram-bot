import { message } from 'telegraf/filters';
import bot from './bot.js';
import { getChatResponse } from './openai.js';

bot.start((ctx) => {
  console.log('New user:', ctx.from);
  ctx.reply('Welcome, my dear user!');
});

bot.on(message('text'), async (ctx) => {
  const { from, text } = ctx.message;

  console.log(`Message: ${text} from @${from.username}`);

  try {
    const response = await getChatResponse(text);
    console.log('response->', response);
    ctx.reply(response);
  } catch (error) {
    console.warn('Error: ', error);
    ctx.reply('Error occured!');
  }
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
