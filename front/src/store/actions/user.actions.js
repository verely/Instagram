import { userService } from '../../services/user.service.js'
import { guestServiceLocal } from '../../services/guest.service.local.js'
import { authService } from '../../services/auth.service.js'
import { store } from '../store.js'
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer.js'
import {
    REMOVE_USER,
    SET_USER,
    LOGIN_AS_GUEST,
    SET_USERS,
    SET_CURRENT_PROFILE,
    FOLLOW_USER,
    UNFOLLOW_USER,
    UPDATE_PROFILE,
    UPDATE_SAVED_POST,
    SET_ERROR,
} from '../reducers/user.reducer.js'
import { socketService } from '../../services/socket.service.js'


  export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        // console.log(`loadUser user: ${JSON.stringify(user)}`)
        store.dispatch({ type: SET_CURRENT_PROFILE, user })
    } catch (err) {
        console.log("Cannot load user", err)
        store.dispatch({ type: SET_ERROR, error: "Error loading user." })
    }
  }

  export async function loadGuestUser(){
    try {
      const user = await guestServiceLocal.getGuestUser()
      store.dispatch({ type: SET_CURRENT_PROFILE, user })
  } catch (err) {
      console.log("Cannot load Guest user", err)
      store.dispatch({ type: SET_ERROR, error: "Error loading Guest user." })
  }
  }

  export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.query()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log("UserActions: err in loadUsers", err)
        store.dispatch({ type: SET_ERROR, error: "Error loading users." })
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
  }

  export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log("UserActions: err in removeUser", err)
        store.dispatch({ type: SET_ERROR, error: "Error removing user." })
    }
  }


  export async function login(credentials) {
    try {
        const user = await authService.login(credentials);
        store.dispatch({
          type: SET_USER,
          user,
        })
        socketService.login(user._id)
        return user
    } catch (err) {
        console.log("Cannot login", err)
        store.dispatch({ type: SET_ERROR, error: "Login failed." })
        throw err
    }
  }

  export async function loginAsGuest() {
    try {
        const user = await authService.loginAsGuest()
        store.dispatch({
          type: LOGIN_AS_GUEST,
          user,
        })
        return user
    } catch (err) {
        console.log("Cannot login as guest", err)
        store.dispatch({ type: SET_ERROR, error: "Login as guest failed." })
        throw err
    }
  }

  export async function signup(credentials) {
    try {
        const user = await authService.signUp(credentials)
        store.dispatch({
          type: SET_USER,
          user,
        })
        socketService.login(user._id)
        return user
    } catch (err) {
        console.log("Cannot signup", err)
        store.dispatch({ type: SET_ERROR, error: "Signup failed." })
        throw err
    }
  }

  export async function logout() {
    try {
        await authService.logout()
        store.dispatch({
          type: SET_USER,
          user: null,
        })
        socketService.logout()
    } catch (err) {
        console.log("Cannot logout", err);
        store.dispatch({ type: SET_ERROR, error: "Logout failed." })
        throw err
    }
  }



  export async function followUser(userId) {
    try {
        const followedUser = await userService.follow(userId)
        store.dispatch({ type: FOLLOW_USER, userId: followedUser._id })
    } catch (err) {
        console.log("UserActions: err in followUser", err)
        store.dispatch({ type: SET_ERROR, error: "Error following user." })
    }
  }

  export async function unfollowUser(userId) {
    try {
        await userService.unfollow(userId)
        store.dispatch({ type: UNFOLLOW_USER, userId })
    } catch (err) {
        console.log("UserActions: err in unfollowUser", err)
        store.dispatch({ type: SET_ERROR, error: "Error unfollowing user." })
    }
  }

  export async function updateUserProfile(user) {
    try {
        const updatedUser = await userService.save(user)
        store.dispatch({ type: UPDATE_PROFILE, user: updatedUser })
    } catch (err) {
        console.log("UserActions: err in updateUserProfile", err)
        store.dispatch({ type: SET_ERROR, error: "Error updating profile." })
    }
  }

  function getService(userId) {
    if (userId === 'guest') {
      return guestServiceLocal
    }
    return userService
  }

  export async function addPostToSaved(userId, postId) {
    const service = getService(userId)
    try {
      await service.addPostToSaved(userId, postId)
      store.dispatch({ type: UPDATE_SAVED_POST, postId })
    } catch (err) {
        console.log(`Failed to save post ${postId}: ${err}`)
        store.dispatch({ type: SET_ERROR, error: "Failed to save post." })
    }
  }
