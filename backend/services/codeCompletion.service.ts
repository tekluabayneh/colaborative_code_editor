import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.HF_API_TOKEN!);

const buildPrompt = (codeSnippet: string, language: string) => `
You are a professional code assistant, like GitHub Copilot.
Your task is to continue the following ${language} code snippet.
Do NOT include backticks, markdown formatting, or explanations — just the raw code.

Code snippet:
${codeSnippet}

Continue the code below:
`;

export const fetchCodeCompletion = async (
  codeSnippet: string,
  language: string
) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = buildPrompt(codeSnippet, language);

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (err: any) {
    console.error("Error in fetchCodeCompletion:", err.message);
    throw new Error("Failed to fetch code completion from Google AI");
  }
};
