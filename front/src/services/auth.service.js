import Axios from 'axios'

import { guestServiceLocal } from  '../services/guest.service.local.js'

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
    getEmptyCredentials,
    loginAsGuest
}

async function signUp({ userName, password, fullName }) {
    const res = await axios.post(BASE_URL + 'signup', { userName, password, fullName })
    const user = res.data
    sessionStorage.setItem(STORAGE_KEY_LOGGED_IN_USER, JSON.stringify(user))
    return user
}

async function login({ userName, password, isGuest=false }) {
    const res = await axios.post(BASE_URL + 'login', { userName, password, isGuest })
    const user = res.data
    sessionStorage.setItem(STORAGE_KEY_LOGGED_IN_USER, JSON.stringify(user))
    if(user.isGuest) {
        guestServiceLocal.saveGuestUser(user)
    }
    return user
}

async function logout() {
    await axios.post(BASE_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGED_IN_USER)
    guestServiceLocal.removeGuestUser()
}

async function loginAsGuest() {
    const guest = {
        isGuest: true
    }
    const user = await login(guest)
    return user

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
