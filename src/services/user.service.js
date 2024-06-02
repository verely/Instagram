import { storageService } from './async-storage.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    increaseFollowingCount,
    updateLocalUserFields
}

window.userService = userService


function getUsers() {
    return storageService.query('user')
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function update({ _id, ...fieldsToUpdate }) {
    const user = await storageService.get('user', _id)
    const userToSave = { ...user, ...fieldsToUpdate }
    await storageService.put('user', userToSave)

    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)

    if (user) {
        return saveLocalUser(user)
    }
}

async function signup(userCred) {

    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post('user', userCred)

    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

async function increaseFollowingCount() {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not logged in')
    user.followingCount++
    await update(user)
    return user.followingCount
}


function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function updateLocalUserFields(user) {
    const currUser = getLoggedinUser()
    const userToSave = { ...currUser, ...user }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return user
}

// function getLoggedinUser() {
//     return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
// }

function getLoggedinUser() {
    const imgPath = '../media_samples/img_profile/1.jpg'
    return { "_id": "u101", "userName": "Tuppence", "fullName": "Tuppence Beresford", "imgUrl": imgPath}
}
