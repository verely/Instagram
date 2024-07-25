import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true
})

const BASE_URL = import.meta.env.VITE_DEV_ENV === 'true'
  ? '//localhost:3000/api/auth/'
  : '/api/auth/'

const STORAGE_KEY_LOGGED_IN_USER = 'loggedInUser'

export const authService = {
    signUp,
    login,
    logout,
    getLoggedInUser,
    getEmptyCredentials
}

async function signUp({ userName, password, fullName }) {
    const res = await axios.post(BASE_URL + 'signup', { userName, password, fullName })
    const user = res.data
    sessionStorage.setItem(STORAGE_KEY_LOGGED_IN_USER, JSON.stringify(user))
    return user
}

async function login({ userName, password }) {
    const res = await axios.post(BASE_URL + 'login', { userName, password })
    const user = res.data
    sessionStorage.setItem(STORAGE_KEY_LOGGED_IN_USER, JSON.stringify(user))
    return user
}

async function logout() {
    await axios.post(BASE_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGED_IN_USER)
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_IN_USER))
}

function getEmptyCredentials() {
    return {
        userName: '',
        password: '',
        fullName: ''
    }
}
