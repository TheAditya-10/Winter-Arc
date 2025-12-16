import "server-only"

import { fetcher } from "./apiService";
import fs from "fs/promises";
import { redis } from "./redis";
import {randomBytes} from "node:crypto"

async function registerUploadInLinkedin(linkedinId, accessToken) {
    const url = "https://api.linkedin.com/v2/assets?action=registerUpload";
    const body = {
        registerUploadRequest: {
            recipes: [
                "urn:li:digitalmediaRecipe:feedshare-image"
            ],
            owner: `urn:li:person:${linkedinId}`,
            serviceRelationships: [
                {
                    relationshipType: "OWNER",
                    identifier: "urn:li:userGeneratedContent"
                }
            ]
        }
    }
    const headers = {
        "Authorization": `Bearer ${accessToken}`
    }
    const response = await fetcher(url, 'post', body, { headers });
    const uploadUrl = response.value.uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"].uploadUrl;
    const asset = response.value.asset;
    return { uploadUrl, asset };
}

async function uploadBinaryFile(sourcePath, destinationUrl, accessToken) {
    const buffer = await fs.readFile(sourcePath);
    const headers = {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "image/png",
        "Content-Length": buffer.length.toString()
    }
    const response = await fetcher(destinationUrl, 'post', buffer, { headers, transformRequest: data => data, maxBodyLength: Infinity });
}

async function publishLinkedinPostWithImage(accessToken, linkedinId, imageAsset, textContent, imageDescription, imageTitle) {
    const url = "https://api.linkedin.com/v2/ugcPosts";
    const body = {
        "author": `urn:li:person:${linkedinId}`,
        "lifecycleState": "DRAFT",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": textContent
                },
                "shareMediaCategory": "IMAGE",
                "media": [
                    {
                        "status": "READY",
                        "description": {
                            "text": imageDescription
                        },
                        "media": imageAsset,
                        "title": {
                            "text": imageTitle
                        }
                    }
                ]
            }
        },
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
    };
    const headers = {
        "Authorization": `Bearer ${accessToken}`
    };

    const response = await fetcher(url, 'post', body, { headers });

    return response.id;
}

async function createVerifcationState(userId) {
    const state = randomBytes(8).toString("hex")
    const key = `li:oauth:state:${userId}`;
    await redis.set(key, state, { ex: 10 * 60 })
    return state;
}

async function isValidateState(state, userId) {
    const key = `li:oauth:state:${userId}`;
    const storedState = await redis.get(key)
    if(!storedState || storedState != state){
        return false
    }
    await redis.del(key);
    return true;
}

export { 
    publishLinkedinPostWithImage, 
    registerUploadInLinkedin, 
    uploadBinaryFile,
    createVerifcationState,
    isValidateState 
}