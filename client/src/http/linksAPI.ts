import {$host} from "./index";

export const generateLink = async (link: string, redirectLink: string) => {
    const {data} = await $host.post('/api/links/generateLink', {link, redirectLink})
    return data
}

export const getRedirectLink = async (link: string) => {
    return new Promise<{ redirectLink: string }>((resolve, reject) => {
        $host.get(`/api/links/redirect_link/${link}`).then(({data}) => {
            resolve({redirectLink: data})
        }).catch(error => {
            reject(error)
        })
    })
}

export const removeLinkById = async(id: number) => {
    const {data} = await $host.post(`/api/links/${id}`)
    return data
}

export const getLinks = async() => {
    const {data} = await $host.get('api/links')
    return data
}