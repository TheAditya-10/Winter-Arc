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
                    image_url: { url: state.imageB64 },
                },
            ]
        },
    ];


    const { feedback, score } = await evaluationModel.invoke(messages);

    return { feedback, score };
}

export { loadImage, evaluateSubmissions }