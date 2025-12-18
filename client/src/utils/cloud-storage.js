import "server-only"

import { fetcher } from "./apiService";


export const uploadFile = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`

    const form = new FormData()
    form.append("api_key", process.env.CLOUDINARY_API_KEY)
    form.append("upload_preset", "demo-preset")
    form.append("file", file)

    const response = await fetcher(url, "post", form, { headers: { "Content-Type": "multipart/form-data" } })
    return response;
}