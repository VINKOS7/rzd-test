export const getAccessToken = () => {
    const storageContent = localStorage.getItem(`library.token`)

    if (storageContent) return storageContent
    
    return null
};