import Axios from 'axios'

import { guestServiceLocal } from  '../services/guest.service.local.js'

var axios = Axios.create({
    withCredentials: true
})

const BASE_URL = import.meta.env.VITE_DEV_ENV === 'true'
  ? '//localhost:3000/api/auth/'
  : '/api/auth/'

const AUTH_ENDPOINTS = {
    SIGNUP: 'signup',
    LOGIN: 'login',
    LOGOUT: 'logout'
}

const STORAGE_KEY_LOGGED_IN_USER = 'loggedInUser'

export const authService = {
    signUp,
    login,
    logout,
    getLoggedInUser,
    getEmptyCredentials,
    loginAsGuest
}

async function signUp({ userName, password, fullName, imgUrl }) {
    try {
        const {data: user} = await axios.post(`${BASE_URL}${AUTH_ENDPOINTS.SIGNUP}`, { userName, password, fullName, imgUrl })
        const loginData = _saveLoginDataLocally(user)
        return loginData
    } catch (err) {
        console.error('Signup failed:', err)
        throw err
    }
}

async function login({ userName, password, isGuest=false }) {
    try {
        const {data: user} = await axios.post(`${BASE_URL}${AUTH_ENDPOINTS.LOGIN}`, { userName, password, isGuest })
        let loginData
        if(user.isGuest) {
            guestServiceLocal.saveGuestUser(user)
            loginData = _extractUserInfo(user)
        }
        else {
            loginData = _saveLoginDataLocally(user)
        }
        return loginData
    } catch (err) {
        console.error('Login failed:', err)
        throw err
    }
}

async function logout() {
    try {
        await axios.post(`${BASE_URL}${AUTH_ENDPOINTS.LOGOUT}`)
        sessionStorage.removeItem(STORAGE_KEY_LOGGED_IN_USER)
        guestServiceLocal.removeGuestUser()
    } catch (err) {
        console.error('Logout failed:', err)
        throw err
    }
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

function _extractUserInfo(user) {
    return {
        _id: user._id,
        userName: user.userName,
        fullName: user.fullName,
        imgUrl: user.imgUrl
    }
}

function _saveLoginDataLocally(user){
    const userInfo = _extractUserInfo(user)
    sessionStorage.setItem(STORAGE_KEY_LOGGED_IN_USER, JSON.stringify(userInfo))
    return userInfo
}
