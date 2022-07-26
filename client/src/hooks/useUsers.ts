import {useEffect, useState} from 'react'
import {AxiosError} from 'axios'
import {IUsers} from "../models/users";
import {getUsers} from "../http/userAPI";

export const useUsers = () => {
    const [users, setUsers] = useState<IUsers[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

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

    return [ users, error, loading ]
}