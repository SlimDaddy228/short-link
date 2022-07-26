import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { getUsers, removeUserById } from "../http/userAPI";
import { GridRowParams } from "@mui/x-data-grid";

export const useUsers = () => {
    const [users, setUsers] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const removeUser = async (params: GridRowParams) => {
        try {
            await removeUserById(Number(params.id))
            setUsers((prevUsers: any) => {
                return prevUsers.filter((data: any) => data.id !== params.row.id)
            })
        } catch (e: unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
    }

    async function fetchUsers() {
        try {
            setError('')
            setLoading(true)
            const createdUsers = await getUsers()
            setUsers([...createdUsers])
            setLoading(false)
        } catch (e: unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return [users, error, loading, removeUser]
}