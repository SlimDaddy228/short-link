import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { getLinks, removeLinkById } from "../http/linksAPI";
import { GridRowParams } from "@mui/x-data-grid";

export const useLinks = () => {
    const [links, setLinks] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const removeLink = async (params: GridRowParams) => {
        try {
            await removeLinkById(Number(params.id))
            setLinks((prevLinks: any) => {
                return prevLinks.filter((data: any) => data.link !== params.row.link)
            })
        } catch (e: unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
    }

    async function fetchLinks() {
        try {
            setError('')
            setLoading(true)
            const createdLinks = await getLinks()
            setLinks([...createdLinks])
            setLoading(false)
        } catch (e: unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchLinks()
    }, [])

    return [links, error, loading, removeLink]
}