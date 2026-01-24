import "server-only"

import { EvaluationStateSchema } from "./schemas";
import { evaluationGraph } from "./graph";


async function evaluateTaskSubmissionsByAI(currentState) {
    try {
        const initialState = EvaluationStateSchema.parse(currentState);
        const finalState = await evaluationGraph.invoke(initialState);
        return finalState;
    } catch (error) {
        console.error(error.message);
        throw new Error("Failed to evaluate submission by AI!!");
    }
}

export { evaluateTaskSubmissionsByAI };