export const SET_POSTS = 'SET_POSTS'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_POST = 'ADD_POST'
export const LIKE_POST = 'LIKE_POST'
export const COMMENT_POST = 'COMMENT_POST'
export const SHARE_POST = 'SHARE_POST'
export const SAVE_POST = 'SAVE_POST'
export const UNDO_REMOVE_POST = 'UNDO_REMOVE_POST'

export const CHANGE_COUNT = 'CHANGE_COUNT'

const initialState = {
    posts: [],
    lastRemovedPost: null,
    count: 10,
}

export function postReducer(state = initialState, action) {
    let newState = state
    let posts
    let removedPost

    switch (action.type) {
        case ADD_POST:
        case SAVE_POST:
            newState = { ...state, posts: [...state.posts, action.post] }
            break
        case REMOVE_POST:
            removedPost = state.posts.find(post => post._id === action.postId);
            posts = state.posts.filter(post => post._id !== action.postId)
            newState = { ...state, posts, lastRemovedPost: removedPost }
            break
        case SET_POSTS:
            newState = { ...state, posts: action.posts }
            break
        case LIKE_POST:
        case COMMENT_POST:
            posts = state.posts.map(post => (post._id === action.post._id) ? action.post : post)
            newState = { ...state, posts }
            break
        case SHARE_POST:
            //to do
            newState = { ...state }
            break
        case UNDO_REMOVE_POST:
            if (state.lastRemovedPost) {
                newState = { ...state, posts: [...state.posts, state.lastRemovedPost], lastRemovedPost: null }
            }
            break
        case CHANGE_COUNT:
            return { ...state, count: state.count + action.diff }
        default:
    }
    return newState
}
