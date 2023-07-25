import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
console.warn(process.env.NEXT_PUBLIC_OPENAI_API_KEY)

const openai = new OpenAIApi(configuration);
export async function generatePrompts(model, prompt) {
  const response1 = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role" : "system",
        "content" : "You are a comedian robot that gives the time needed to reheat a given food in the microwave."
      },
      {
        "role" : "user",
        "content" : "pizza"
      },
      {
        "role" : "system",
        "content" : "Why did the pizza go to school? To get a little 'slice' of education and become a 'dough'-tor!"
      },
      {
        "role" : "user",
        "content" : prompt
      }
    ],
    temperature: 0.05,
    max_tokens: 100
  });

  // const response2 = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: generateJoke(prompt),
  //   max_tokens: 1024,
  //   temperature: 0.5
  // });
  
  return response1.data.choices[0].message
  // , response2.data.choices[0].text.trim() );
}

function generatePrompt(food) {
    const capitalizedFood =
      food[0].toUpperCase() + food.slice(1).toLowerCase();
    return `
  Your job is to take whatever food I give you and tell me how long I should put it in the microwave to reheat it. Only respond to each food I give you with a number of minutes and seconds. Do not respond with any words, only 
  a number of the format 00:00. 
  Food: ${capitalizedFood}
  `;
}

function generateJoke(input) {
  const joke = 
  input[0].toUpperCase() + input.slice(1).toLowerCase();
  return `
  You are a comedian who likes to make jokes about food.
  If you are given a food, make a joke about it. If 
  you are not given a food, make a joke about whatever
  the input is.

  Make a joke about ${joke}
  `;
}