import "server-only"

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { EvaluationResponseSchema } from "./schemas.js";

const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    temperature: 0.1,
});

const evaluationModel = llm.withStructuredOutput(EvaluationResponseSchema, { name: "Evaluation"});

export { evaluationModel };