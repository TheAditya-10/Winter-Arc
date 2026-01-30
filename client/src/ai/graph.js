import "server-only"

import { StateGraph, START, END } from "@langchain/langgraph";
import { EvaluationStateSchema } from "./schemas.js";
import { loadImage, evaluateSubmissions } from "./steps.js";

const evaluationGraph = new StateGraph(EvaluationStateSchema)
    .addNode("loadImage", loadImage)
    .addNode("evaluateSubmissions", evaluateSubmissions)
    .addEdge(START, "loadImage")
    .addEdge("loadImage", "evaluateSubmissions")
    .addEdge("evaluateSubmissions", END)
    .compile();

export { evaluationGraph };