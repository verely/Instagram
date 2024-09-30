import Cryptr from 'cryptr'
import bcrypt from 'bcrypt'

import { userService } from '../user/user.service.js'
import { logger } from '../../services/logger.service.js'

export const authService = {
    signup,
    login,
    getLoginToken,
    validateToken,
    loginAsGuest
}

const BACKEND_PUBLIC_IMAGES_URL = process.env.NODE_ENV === 'true'
  ? '//localhost:3000/images/'
  : '/images/'
const cryptr = new Cryptr(process.env.CRYPT_KEY || 'Secret-CRYPT')


async function signup(userName, password, fullName, imgUrl) {
    const saltRounds = 10

    logger.debug(`auth.service - signup with userName: ${userName}, fullName: ${fullName}`)
    if (!userName || !password || !fullName) throw new Error('Missing details')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ userName, password: hash, fullName, imgUrl })
}

async function login(userName, password) {
    logger.debug(`auth.service - login with userName: ${userName}`)

    const user = await userService.getByUserName(userName)
    if (!user) throw new Error('Invalid userName or password')

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new Error('Invalid userName or password')

    delete user.password
    return user
}

function loginAsGuest() {
    const user = {
        _id: 'guest',
        userName: "Guest",
        fullName: "Guest User",
        imgUrl:`${BACKEND_PUBLIC_IMAGES_URL}guest-icon.png`,
        bio: '',
        followingCount: 0,
        followersCount: 0,
        savedPostIds: [],
        isGuest: true,
        isAdmin: false
    }
    logger.debug(`auth.service - login with userName: ${user.userName}`)
    return user
}

function getLoginToken(user) {
    const userInfo = {_id : user._id, userName: user.userName, fullName: user.fullName, imgUrl: user.imgUrl}
    return cryptr.encrypt(JSON.stringify(userInfo))
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser
    } catch(err) {
        console.log('Invalid login token')
    }
    return null
}
