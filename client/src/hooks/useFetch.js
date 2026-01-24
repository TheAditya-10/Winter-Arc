import { useState, useEffect } from "react";

export default function useFetch(queryFn) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        ; (
            async () => {
                try {
                    setIsLoading(true)
                    setError(null)
                    const response = await queryFn()
                    setData(response.data)
                } catch (e) {
                    console.error(e)
                    setError(e.message || "Unknown Error")
                } finally {
                    setIsLoading(false)
                }
            }
        )()
    }, [queryFn])

    return {data, error, isLoading}
}