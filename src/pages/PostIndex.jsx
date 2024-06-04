import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadPosts, removePost,
    updateLikeStatus, addCommentToPost,
    sharePost, getActionRemovePost } from '../store/actions/post.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { PostList } from '../cmps/PostList.jsx'




export function PostIndex() {

    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const posts = useSelector(storeState => storeState.postModule.posts)
    const dispatch = useDispatch()

    const handleOpenCreatePost = () => {
       setIsCreatePostOpen(true);
    };

    const handleCloseCreatePost = () => {
       setIsCreatePostOpen(false);
    };

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
            const user = getLoggedInUser()
            updateLikeStatus(actionType, postId, user)
        } catch (err) {
            showErrorMsg(`Cannot ${actionType} post`)
        }
    }

    function onAddCommentToPost(postId, text) {
        try {
            const user = getLoggedInUser()
            addCommentToPost(postId, text, user)
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

    function getLoggedInUser() {
        const imgPath = '../media_samples/img_profile/1.jpg'
        return { "_id": "u101", "userName": "Tuppence", "fullName": "Tuppence Beresford", "imgUrl": imgPath}

        // const imgPath = '../media_samples/img_profile/sloner.jpeg'
        // return { "_id": "u103", "userName": "Sloner_garden", "fullName": "Mashtelat Sloner", "imgUrl": imgPath}
        //return userService.getLoggedinUser()
    }

    const postActions = {
        onRemovePost: onRemovePost,
        onUpdateLikeStatus: onUpdateLikeStatus,
        onAddCommentToPost: onAddCommentToPost,
        onSharePost: onSharePost,
        onSavePost: onSavePost
       };

    return (
        <div className="layout-container">
            <section className="content-wrapper">
                <div className="content-area">
                    <div className="featured-stories">

                        <img src="../media_samples/img_profile/sloner.jpeg" alt="story" />
                        <img src="../media_samples/img_profile/sloner.jpeg" alt="story" />
                        <img src="../media_samples/img_profile/sloner.jpeg" alt="story" />
                        <img src="../media_samples/img_profile/sloner.jpeg" alt="story" />
                        <img src="../media_samples/img_profile/sloner.jpeg" alt="story" />
                        <img src="../media_samples/img_profile/sloner.jpeg" alt="story" />
                        <img src="../media_samples/img_profile/sloner.jpeg" alt="story" />

                    </div>
                    <div className='posts'>
                      <PostList posts={posts} postActions={postActions} currentUser={getLoggedInUser()}/>
                    </div>
                </div>
            </section>
        </div>
    )
}
