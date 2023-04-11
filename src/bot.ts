import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { onBotMessage, onBotStart, onBotVoice } from './handlers.js';

const _bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

_bot.start(onBotStart);
_bot.on(message('text'), onBotMessage);
_bot.on(message('voice'), onBotVoice);

export const startBot = (): void => {
  _bot
    .launch()
    .then(() => {
      console.log('Bot started!');
    })
    .catch((error) => {
      console.error('Bot launch error: ', error);
    });
};

export const stopBot = (reason: string): void => {
  _bot.stop(reason);
};
