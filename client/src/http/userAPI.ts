import { $host, $authHost } from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (email: string, password: string, roleValue?: string) => {
    const { data } = await $host.post('/api/auth/registration', { email, password, roleValue })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const removeUserById = async (id: number) => {
    const { data } = await $host.post('/api/users/remove', { id })
    return data
}

export const login = async (email: string, password: string) => {
    const { data } = await $host.post('api/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const { data } = await $authHost.get('api/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const getUsers = async () => {
    const { data } = await $host.get('api/users')
    return data
}