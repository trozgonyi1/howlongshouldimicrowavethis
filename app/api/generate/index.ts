import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function (req: { body: { food: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: { message: string; } | { message: string; } | { message: string; }; result?: string | undefined; }): void; new(): any; }; }; }) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const food = req.body.food || '';
  if (food.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid meal",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(food),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generateJoke(food),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(animal: string) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `
Your job is to take whatever food I give you and tell me how long I should put it in the microwave to reheat it. Only respond to each food I give you with a number of minutes and seconds. Do not respond with any words, only 
a number of the format 00:00.
Input: ${capitalizedAnimal}
`;
}

function generateJoke(input: string) {
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
