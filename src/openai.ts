import fs from 'fs';
import path from 'path';
import { Configuration, OpenAIApi } from 'openai';

const _configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});

const _openai = new OpenAIApi(_configuration);

export const getChatResponse = async (text: string): Promise<string> => {
  const completion = await _openai.createCompletion({
    model: 'text-davinci-003',
    prompt: text,
    temperature: Number(process.env.OPENAI_TEMPERATURE) || 0.8,
    max_tokens: 1500,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  return completion.data.choices[0].text;
};

export const getTranscription = async (audio: any): Promise<any> => {
  const file = await fs.promises.readFile(
    path.resolve(__dirname, '../file_0.mp3')
  );

  const transcription = await _openai.createTranscription(file, 'whisper-1');

  return transcription.data.text;
};
