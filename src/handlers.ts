import { getChatResponse } from './openai.js';

export const onBotStart = async (ctx): Promise<void> => {
  const { from } = ctx.message;
  console.log('New user:', ctx.from);
  ctx.reply(`Welcome, @${from.username}!`);
};

export const onBotMessage = async (ctx): Promise<void> => {
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
};
