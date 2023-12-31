"use client";
import Head from "next/head";
import { useState } from "react";
import { generatePrompts } from './utils/openai';
import { Lato } from "next/font/google";

export default function Home() {
  const [foodInput, setFoodInput] = useState("");
  const [result, setResult] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [effect, setEffect] = useState(false);

  async function onSubmit(event: any) {
    event.preventDefault();
    setLoading(true);
    const prompts = await generatePrompts('text-davinci-003s', foodInput);

    setResult(prompts?.content);
    setFoodInput("");
    setLoading(false);
  }

  return (
    <div className=" bg-bgcolor-100">
      <main className=" w-screen h-screen flex justify-center">
        <div className="flex flex-col items-center">
          <img src="/microwave.svg" className=" w-28 h-28" />
          <h3 className=" font-semibold">How long should I microwave this?</h3>
          <div className="relative mb-3" data-te-input-wrapper-init>
            <form onSubmit={onSubmit} className="flex flex-col items-center">
              <input
                className={`bg-foodpink rounded-md p-2 w-60 placeholder:text-textcolor-200 accent-accent-400`}
                type="text"
                name="meal"
                id="meal"
                placeholder="Enter a meal"
                value={foodInput}
                onChange={(e) => setFoodInput(e.target.value)}
              />
              <button
                className={`${
                  effect && " scale-90"
                } bg-teal-400 p-2 rounded-md mt-2 w-56`}
                onMouseDown={() => {
                  setEffect(true);
                }}
                onMouseLeave={() => setEffect(false)}
                onMouseUp={() => setEffect(false)}
                type="submit"
                value="Feed me"
              >
                Feed Me
              </button>
            </form>
          </div>
          {loading ? 
           <img src="./loading.svg" className=" w-28 h-28" />
           : 
           <div className=" w-1/3 min-w-1/2 text-center bg-accent-100 border-teal-900 rounded-lg border-2">{result}</div>}
        </div>
      </main>
    </div>
  );
}
