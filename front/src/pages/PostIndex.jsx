import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadPosts, removePost,
    updateLikeStatus, addCommentToPost,
    sharePost, getActionRemovePost } from '../store/actions/post.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { PostList } from '../cmps/PostList.jsx'


export function PostIndex() {

    const loggedInUser = useSelector(state => state.userModule.user)
    const posts = useSelector(storeState => storeState.postModule.posts)

    useEffect(() => {
        loadPosts()
    }, [])

    async function onRemovePost(postId) {
        try {
            await removePost(postId)
            showSuccessMsg('Post removed')
        } catch (err) {
            showErrorMsg('Cannot remove post')
        }
    }

    async function onUpdateLikeStatus(postId, actionType) {
        try {
            updateLikeStatus(actionType, postId, loggedInUser)
        } catch (err) {
            showErrorMsg(`Cannot ${actionType} post`)
        }
    }

    function onAddCommentToPost(postId, text) {
        try {
            addCommentToPost(postId, text, loggedInUser)
        } catch (err) {
            showErrorMsg(`Cannot comment post`)
        }
    }

    function onSharePost(postId, recipient) {
        console.log(`TODO Share post`)
    }

    function onSavePost(post) {
        console.log(`TODO Save post`)
    }


    const postActions = {
        onRemovePost: onRemovePost,
        onUpdateLikeStatus: onUpdateLikeStatus,
        onAddCommentToPost: onAddCommentToPost,
        onSharePost: onSharePost,
        onSavePost: onSavePost
    }

    return (
        <div className="post-index">
            <div className='spacer'></div>
            <div className="content-area">
                <div className="featured-stories">
                    <img src="../media_samples/img_profile/sloner.jpeg" alt="story" />
                    <img src="../media_samples/img_profile/sloner.jpeg" alt="story" />
                    <img src="../media_samples/img_profile/sloner.jpeg" alt="story" />
                </div>
                <div className='posts'>
                    <PostList posts={posts} postActions={postActions} currentUser={loggedInUser}/>
                </div>
            </div>
            <div className='ad-wrapper'>
            </div>
            <div className='spacer'></div>
        </div>
    )
}
