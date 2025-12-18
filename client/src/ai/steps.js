import "server-only"

import fs from "fs/promises";
import { evaluationModel } from "./model";
import z from "zod";

const loadImage = async (state) => {
    const url = state.imageUrl;
    const buffer = await fs.readFile(url);
    const b64 = buffer.toString('base64');
    return { imageB64: b64 };
}

const evaluateSubmissions = async (state) => {
    const messages = [
        {
            role: "system",
            content: [
                {
                    type: 'text',
                    text: "Following task is given to user and in response user submmited a text which describe their work and a image. Based on authenticity and completion of work assianed to the user give a score out of 50 to the user and a feedback for future imporvement."
                },
                {
                    type: 'text',
                    text: `task: \ntitle:${state.taskTitle}\nDescription:${state.taskDescription}\n\n\n\nchallenge: \ntitle:${state.challengeTitle}\nDescription:${state.challengeDescription}`
                }
            ]
        },
        {
            role: "user",
            content: [
                {
                    type: 'text',
                    text: `description: ${state.description}`
                },
                {
                    type: 'image_url',
                    image_url: { url: `data:image/png;base64,${state.imageB64}` },
                },
            ]
        },
    ];


    const { feedback, score } = await evaluationModel.invoke(messages);

    return { feedback, score };
}

export { loadImage, evaluateSubmissions }

const initialState = {
    task: "build a portfolio website using html, css and javascript make it responsive and simple",
    imageUrl: "C:\\Users\\learn\\LocalFiles\\Documents\\web_devlopment\\Winter-Arc\\client\\public\\test.png",
    imageB64: z.base64(),
    description: "I first build structure of my portfolio website using html and then style it using css make website responsive using media query and write logic of contect form using javascript",
    score: z.int().gte(0).lte(50),
    feedback: z.string(),
}