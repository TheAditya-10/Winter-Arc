import { NextResponse } from "next/server"
import { evaluationGraph } from "@/ai/graph"
import { EvaluationStateSchema } from "@/ai/schemas"


export async function POST(request) {
    try {
        const body = await request.json();
        const initialState = EvaluationStateSchema.parse(body);
        const finalState = await evaluationGraph.invoke(initialState);
        return NextResponse.json(finalState);
    } catch (error) {
        console.error(error.message);
        return NextResponse.json({error: error})
    }
}
