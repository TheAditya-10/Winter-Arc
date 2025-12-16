import "server-only"
import crypto from "node:crypto"
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@/utils/supabase/server";

const supabase = await createClient()

function encrypt(text){
    const algo = process.env.ENCRYPT_ALGO;
    const key = process.env.ENCRYPT_SECRET;

    const iv = crypto.randomBytes(12);
    const chiper = crypto.createCipheriv(algo, Buffer.from(key, 'hex'), iv);
    let encrypted = chiper.update(text, 'utf-8', 'hex');
    encrypted += chiper.final('hex');
    const authTag = chiper.getAuthTag();
    return iv.toString('hex') + ':' + encrypted + ':' + authTag.toString('hex');
}

function decrypt(eText){
    const algo = process.env.ENCRYPT_ALGO;
    const key = process.env.ENCRYPT_SECRET;

    const parts = eText.split(":");
    const iv = Buffer.from(parts.shift(), 'hex');
    const authTag = Buffer.from(parts.pop(), 'hex');
    const eTextBuffer = Buffer.from(parts.join(':'), 'hex');
    const dechiper = crypto.createDecipheriv(algo, Buffer.from(key, 'hex'), iv);
    dechiper.setAuthTag(authTag)
    let decrypted = dechiper.update(eTextBuffer, "hex", "utf-8");
    decrypted += dechiper.final('utf-8');
    return decrypted;
}


export const getUserCred = async () => {

    const { userId } = await auth()
    const { data, error } = await supabase
        .from("linked_creds")
        .select("accessToken:access_token, expiresIn:expires_in, createdAt:created_at, linkedinId:linkedin_id")
        .eq("user_id", userId)
        .limit(1)
        .single()

    return { data: {...data, accessToken: decrypt(data.accessToken)}, error }
}

export const setUserCred = async (access_token, linkedin_id, expires_in) => {
    const { userId } = await auth()

    const { error } = await supabase
        .from("linked_creds")
        .insert({ expires_in, linkedin_id, access_token: encrypt(access_token), user_id: userId })

    return { error }
}
