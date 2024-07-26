import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true
})


const BASE_URL = import.meta.env.VITE_DEV_ENV === 'true'
  ? '//localhost:3000/api/post/'
  : '/api/post/'


export const postService = {
    query,
    get,
    remove,
    save,
    getEmptyPost,
    getDefaultFilter,
}

async function query(filterBy = {}) {
     const { data: posts } = await axios.get(BASE_URL, { params: filterBy })
    return posts
}

async function get(postId) {
    const { data: post } = await axios.get(BASE_URL + postId)
    return post
}

async function remove(postId) {
    return axios.delete(BASE_URL + postId)
}

async function save(post) {
    const method = post._id ? 'put' : 'post'
    const { data: savedPost } = await axios[method](BASE_URL + (post._id || ''), {post})
    console.log(savedPost)
    return savedPost
}

function getEmptyPost(title = '', desc='', severity = '') {
    return { title, desc, severity }
}

function getDefaultFilter() {
    return { title: '', minSeverity: '', pageIndex: 0 }
}
