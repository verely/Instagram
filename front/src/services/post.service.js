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
    getEmptyBug,
    getDefaultFilter,
}

async function query(filterBy = {}) {
     const { data: bugs } = await axios.get(BASE_URL, { params: filterBy })
    return bugs
}

async function get(bugId) {
    const { data: bug } = await axios.get(BASE_URL + bugId)
    return bug
}

async function remove(bugId) {
    return axios.delete(BASE_URL + bugId)
}

async function save(bug) {
    const method = bug._id ? 'put' : 'post'
    const { data: savedBug } = await axios[method](BASE_URL + (bug._id || ''), {bug})

    // const queryParams = `?_id=${bug._id || ''}&title=${bug.title}&desc=${bug.desc}&severity=${bug.severity}`
    // const { data: savedBug } = await axios.get(BASE_URL + 'save' + queryParams)
    return savedBug
}

function getEmptyBug(title = '', desc='', severity = '') {
    return { title, desc, severity }
}

function getDefaultFilter() {
    return { title: '', minSeverity: '', pageIndex: 0 }
}
