import "server-only"

import { evaluationModel } from "./model";

const loadImage = async (state) => {
    const url = state.imageUrl;
    const response = await fetch(url);
    const blob = await response.arrayBuffer();
    const contentType = response.headers.get("content-type");
    return { imageB64: `data:${contentType};base64,${Buffer.from(blob).toString("base64")}` };
}

const evaluateSubmissions = async (state) => {
    const messages = [
        {
            role: "system",
            content: [
                {
                    type: 'text',
                    text: "Following task is given to user and in response user submmited a text which describe their work and a image as proof of work. Based on authenticity and completion and also if submitted text seems like llm generated text or not (if llm generated text give less marks) of work assianed to the user give a score out of 50 to the user and a feedback for future imporvement. Also judge image quite efficiently that if it is computer screenshots or downloaded image for tasks required manual work proofs give them less marks but approve these thypes of screenshot in tech tasks required ss of code."
                },
                {
                    type: 'text',
                    text: `task: \ntitle:${state.taskTitle}\nDescription:${state.taskDescription}\n\n\n\nchallenge: \ntitle:${state.challengeTitle}\nDescription:${state.challengeDescription}`
                }, 
                {
                    type: 'text',
                    text: `todays date: ${new Date().toUTCString()} (UTC)\n this date is given for refference to avoid problems from "LLM knowlege cutoff date".`
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
                    image_url: { url: state.imageB64 },
                },
            ]
        },
    ];


    const { feedback, score } = await evaluationModel.invoke(messages);

    return { feedback, score };
}

export { loadImage, evaluateSubmissions }