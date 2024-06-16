import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedInUser,
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

    const user = {
        _id: utilService.makeId(),
        userName: userCred.userName,
        password: userCred.password, // Use bcrypt for hashed password on server
        fullName: userCred.fullName || 'New User',
        imgUrl: userCred.imgUrl? userCred.imgUrl : 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
        bio: '',
        followingCount: 0,
        followersCount: 0,
        savedStoryIds: [],
    };

    await storageService.post('user', user)

    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

async function increaseFollowingCount() {
    const user = getLoggedInUser()
    if (!user) throw new Error('Not logged in')
    user.followingCount++
    await update(user)
    return user.followingCount
}


function saveLocalUser(user) {
    user = { _id: user._id, userName: user.userName, fullName: user.fullName, imgUrl: user.imgUrl,
        bio: user.bio, followingCount: user.followingCount, followersCount: user.followersCount, savedPostIds: user.savedPostIds}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function updateLocalUserFields(user) {
    const currUser = getLoggedInUser()
    const userToSave = { ...currUser, ...user }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return user
}

// function getLoggedInUser() {
//     const imgPath = '../media_samples/img_profile/1.jpg'
//     return { "_id": "u101", "userName": "Tuppence", "fullName": "Tuppence Beresford", "imgUrl": imgPath}
// }

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

(async ()=> {
    const users = await userService.getUsers()
    if (!users.some(user=> user.userName === 'Tuppence'))
        await userService.signup({fullName: 'Tuppence Beresford', userName: 'Tuppence', password:'123',
                              imgUrl: '../media_samples/img_profile/1.jpg'})

    if (!users.some(user=> user.userName === 'sloner_garden'))
        await userService.signup({fullName: 'משתלת סלונר', userName: 'sloner_garden', password:'123',
                            imgUrl: '../media_samples/img_profile/sloner.jpeg'})
})()
