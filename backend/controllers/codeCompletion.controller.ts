import { Request, Response } from "express";
import { fetchCodeCompletion } from "../services/codeCompletion.service";

export const getCodeCompletion = async (req: Request, res: Response) => {
  try {
    const { codeSnippet, language } = req.body;
    if (!codeSnippet || !language) {
      res.status(400).json({ error: "codeSnippet and language required" });
      return;
    }

    const completion = await fetchCodeCompletion(codeSnippet, language);
    res.status(200).json({ completion });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch code completion" });
  }
};
