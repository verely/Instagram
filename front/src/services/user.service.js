import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true
})

const BASE_URL = import.meta.env.VITE_DEV_ENV === 'true'
  ? '//localhost:3000/api/user/'
  : '/api/user/'


export const userService = {
    query,
    getById,
    remove,
    save,
    addPostToSaved
}

async function query(filterBy = {}) {
    let { data: users } = await axios.get(BASE_URL, { params: filterBy })
    return users
}

async function getById(userId) {
    const { data: user } = await axios.get(BASE_URL + userId)
    return user
}

async function remove(userId) {
    return axios.delete(BASE_URL + userId)
}

async function save(user) {
    const method = user._id ? 'put' : 'post'
    const { data: savedUser } = await axios[method](BASE_URL + (user._id || ''), user)
    return savedUser
}

async function addPostToSaved(userId, postId){
    try {
        await axios.put(`${BASE_URL}/${userId}/saved`, { postId })
        return true
      } catch (err) {
        console.error('Failed to save post:', err)
        throw err
      }
}
