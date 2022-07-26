const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;

export const generateLinkId = (length: number): string => {
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomCharacters = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomCharacters);
    }
    return result;
}