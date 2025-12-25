import "server-only"

import { createHash } from "node:crypto"

export const genrateSignature = async () => {
    const timestamp = Math.round(Date.now() / 1000);
    const upload_preset = "test-preset";
    const text = `timestamp=${timestamp}&upload_preset=${upload_preset}${process.env.CLOUDINARY_API_SECRET}`
    const signature = createHash("sha256").update(text).digest("hex");

    const uploadConfig = {
        timestamp,
        upload_preset,
        signature_algorithm: "sha256",
        api_key: process.env.CLOUDINARY_API_KEY,
        signature,
    }
    return { uploadConfig }
}