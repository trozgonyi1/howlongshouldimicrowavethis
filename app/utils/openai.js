import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
console.warn(process.env.NEXT_PUBLIC_OPENAI_API_KEY)

const openai = new OpenAIApi(configuration);
export async function generatePrompts(engine, prompt) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(prompt),
    max_tokens: 1024,
    temperature: 0.5
  });
  
  return response.data.choices[0].text.trim();
}

function generatePrompt(animal) {
    const capitalizedAnimal =
      animal[0].toUpperCase() + animal.slice(1).toLowerCase();
    return `
  Your job is to take whatever food I give you and tell me how long I should put it in the microwave to reheat it. Only respond to each food I give you with a number of minutes and seconds. Do not respond with any words, only 
  a number of the format 00:00. 
  Food: ${capitalizedAnimal}
  `;
}