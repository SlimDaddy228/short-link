import {$host} from "./index";

export const generateLink = async (link: string, redirectLink: string) => {
    const {data} = await $host.post('/api/links/generateLink/create', {link, redirectLink})
    return data
}

export const getRedirectLink = async (link: string) => {
    const {data} = await $host.get(`/api/links/redirect_link/${link}`)
    return data
}

export const removeLinkById = async(id: number) => {
    const {data} = await $host.post(`/api/links/${id}`)
    return data
}

export const getLinks = async() => {
    const {data} = await $host.get('api/links')
    return data
}