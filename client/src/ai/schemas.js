import z from "zod";

const EvaluationStateSchema = z.object({
    taskTitle: z.string(),
    taskDescription: z.string(),
    challengeTitle: z.string(),
    challengeDescription: z.string(),
    imageUrl: z.string(),
    imageB64: z.base64().optional(),
    description: z.string(),
    score: z.int().min(0).max(50).optional(),
    feedback: z.string().optional(),
});

const LinkedinPostStateSchema = z.object({
    task: z.string(),
    imageFile: z.file().max(1024 * 1024).mime(['image/jpeg', 'image/png']),
    imageDescription: z.string(),
    description: z.string(),
    post: z.string()
});

const EvaluationResponseSchema = z.object({
    score: z.number().int().min(0).max(50).describe('score out of 50 base on the response submmited by the user for the given task'),
    feedback: z.string('feedback for the user for future imporvements'),
})

export { EvaluationStateSchema, LinkedinPostStateSchema, EvaluationResponseSchema };
