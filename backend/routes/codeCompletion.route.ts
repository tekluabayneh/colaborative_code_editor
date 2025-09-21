import { Router } from "express";
import { getCodeCompletion } from "../controllers/codeCompletion.controller";

const AICodeCompletionRouter = Router();

// POST /api/code-complete
AICodeCompletionRouter.post("/code-complete", getCodeCompletion);

export default AICodeCompletionRouter;
