
// Add the new action types
export const FOLLOW_USER = "FOLLOW_USER"
export const UNFOLLOW_USER = "UNFOLLOW_USER"
export const UPDATE_PROFILE = "UPDATE_PROFILE"
export const SET_ERROR = "SET_ERROR"

export const SET_USER = "SET_USER"
export const SET_CURRENT_PROFILE = "SET_CURRENT_PROFILE"
export const REMOVE_USER = "REMOVE_USER"
export const SET_USERS = "SET_USERS"
export const LOGIN_AS_GUEST = "LOGIN_AS_GUEST"


const initialState = {
    user: null,
    users: [],
    currentProfile: null,
    error: null,
};


export function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_AS_GUEST:
        case SET_USER:
          return { ...state, user: action.user };
        case SET_CURRENT_PROFILE:
          console.log("SET_CURRENT_PROFILE", action.user)
          return { ...state, currentProfile: action.user };
        case REMOVE_USER:
          return {
            ...state,
            users: state.users.filter((user) => user._id !== action.userId),
          };
        case SET_USERS:
          return { ...state, users: action.users };
        case FOLLOW_USER:
          return {
            ...state,
            user: {
              ...state.user,
              following: [...state.user.following, action.userId],
            },
          };
        case UNFOLLOW_USER:
          return {
            ...state,
            user: {
              ...state.user,
              following: state.user.following.filter((id) => id !== action.userId),
            },
          };
        case UPDATE_PROFILE:
          return { ...state, user: { ...state.user, ...action.user } };
        case SET_ERROR:
          return { ...state, error: action.error };
        default:
          return state;
      }
}
