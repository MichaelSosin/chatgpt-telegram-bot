import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getChatResponse = async (text) => {
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: text,
    temperature: 0.8,
    max_tokens: 1500,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  return completion.data.choices[0].text;
};

export default openai;
