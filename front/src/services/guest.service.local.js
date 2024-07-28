const STORAGE_KEY_GUEST_USER = 'guestUser'

export const guestServiceLocal = {
    getGuestUser,
    saveGuestUser,
    updateGuestUserFields,
    removeGuestUser
}
window.userServiceLocal = guestServiceLocal


function getGuestUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_GUEST_USER))
}

function saveGuestUser(user) {
    user = { _id: user._id, userName: user.userName, fullName: user.fullName, imgUrl: user.imgUrl,
        bio: user.bio, followingCount: user.followingCount, followersCount: user.followersCount, savedPostIds: user.savedPostIds}
    sessionStorage.setItem(STORAGE_KEY_GUEST_USER, JSON.stringify(user))
    return user
}

function updateGuestUserFields(user) {
    const currUser = getGuestUser()
    const userToSave = { ...currUser, ...user }
    sessionStorage.setItem(STORAGE_KEY_GUEST_USER, JSON.stringify(userToSave))
    return user
}

async function removeGuestUser() {
    sessionStorage.removeItem(STORAGE_KEY_GUEST_USER)
}
