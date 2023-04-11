import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { getChatResponse, getTranscription } from './openai.js';

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

export const onBotVoice = async (ctx): Promise<void> => {
  const { from, voice } = ctx.message;

  console.log(`Voice message from @${from.username}`, ctx.message);
  try {
    const { href } = await ctx.telegram.getFileLink(voice.file_id);
    console.log('Voice message link: ', href);

    const fileStream = await axios({
      url: href,
      responseType: 'stream',
    });

    fileStream.data.on('data', (chunk) => {
      console.log('Chunk: ', chunk);
    });

    // console.log('Voice message stream: ', fileStream);

    const transcription = await getTranscription('asd');
    // console.log('Transcription: ', transcription);
    ctx.reply('Voice messages are not supported yet!');
  } catch (error) {
    // console.log('Error: ', error);

    ctx.reply('Error occured with your voice message!');
  }
};
