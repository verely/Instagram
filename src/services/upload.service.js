export const uploadService = {
    handleUploadImg,
    uploadImgFile
}

async function uploadImgFile(file) {
    const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
    const UPLOAD_URL = import.meta.env.VITE_UPLOAD_URL

    console.log('UPLOAD_PRESET:', UPLOAD_PRESET)
    console.log('UPLOAD_URL:', UPLOAD_URL)
    try {
        const formData = new FormData()
        formData.append('upload_preset', UPLOAD_PRESET)
        formData.append('file', file)
        console.log('file:', file)

        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const imgData = await res.json()
        console.log('imgData', imgData)

        return imgData
    } catch (err) {
        console.error('Failed to upload', err)
        throw err
    }
}

async function handleUploadImg(ev) {
    if (!ev || !ev.target || !ev.target.files || !ev.target.files[0]) {
        throw new Error('No file selected for upload');
    }

    const file = ev.target.files[0];
    return await uploadImgFile(file);
}
