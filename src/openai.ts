// refactor this file to typescript and add types to the functions
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getChatResponse = async (text: string): Promise<string> => {
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: text,
    temperature: 1,
    max_tokens: 1500,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  return completion.data.choices[0].text;
};

export default openai;
