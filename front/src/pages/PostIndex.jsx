import { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useIntersectionObserver } from '../hook/useIntersectionObserver'

import { loadPosts, removePost,
    updateLikeStatus, addCommentToPost,
    sharePost } from '../store/actions/post.actions.js'
import { addPostToSaved } from '../store/actions/user.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { PostList } from '../cmps/PostList.jsx'

import { PostDetails } from '../cmps/PostDetails'
import { ModalCmp } from '../cmps/ModalCmp'

import loading from '../assets/img/shared/loading.svg'

export function PostIndex() {

    const loggedInUser = useSelector(state => state.userModule.user)
    const posts = useSelector(storeState => storeState.postModule.posts)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedPostId, setSelectedPostId] = useState(null)
    const navigate = useNavigate()

    const [page, setPage] = useState(1)
    const [hasMorePosts, setHasMorePosts] = useState(true)
    const [observerRef, isIntersecting] = useIntersectionObserver({
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    })

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (hasMorePosts) {
            loadPostsAndUpdateState()
        }
    }, [page])

    // Trigger load more posts when intersecting
    useEffect(() => {
        if (isIntersecting && hasMorePosts && posts.length > 0) {
            //console.log('Intersection observer detected last post')
            setPage(prevPage => prevPage + 1)
        }
    }, [isIntersecting, hasMorePosts, posts.length])

    const loadPostsAndUpdateState = async () => {
        try {
            //console.log(`Loading posts for page: ${page}`)
            setIsLoading(true)
            const hasMore = await loadPosts(page)
            setHasMorePosts(hasMore)
            //console.log(`Posts loaded. More posts available: ${hasMore}`)
        } catch (error) {
            console.error('Error loading posts:', error)
            setHasMorePosts(false)
        }
        finally
        {
            setIsLoading(false)
        }
    }

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

    function onCommentDisplayAction(postId) {
        console.log('onCommentDisplayAction', postId)
        setSelectedPostId(postId)
        setIsModalOpen(true)
        window.history.replaceState(null, '', `/p/${postId}`) //update the URL without full navigation
    }

    const closeModal = () => {
        setIsModalOpen(false)
        navigate(`/`, { replace: true, state: { modal: false } })
    }

    function onSharePost(postId, recipient) {
        console.log(`TODO Share post`)
    }

    function onAddPostToSaved(postId) {
        try {
            console.log(`Saving post ${postId}...`)
            addPostToSaved(loggedInUser._id , postId)
        } catch (err) {
            showErrorMsg(`Cannot add post to saved collection`)
        }
    }


    const postActions = {
        onRemovePost: onRemovePost,
        onUpdateLikeStatus: onUpdateLikeStatus,
        onAddCommentToPost: onAddCommentToPost,
        onCommentDisplayAction: onCommentDisplayAction,
        onSharePost: onSharePost,
        onSavePost: onAddPostToSaved
    }

    if ( isLoading) {
        return (
            <div className="post-index">
                <div className="loader-container">
                    <img
                        className={`loading-icon ${isLoading ? '' : 'hidden'}`}
                        src={loading}
                        alt="Loading..."
                    />
                </div>
            </div>
        )
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
                    <div ref={observerRef}/>
                </div>
            </div>
            <div className='user-suggestions'>
            </div>
            <div className='spacer'></div>

            {isModalOpen && (
                    <ModalCmp onClose={closeModal}>
                        <PostDetails postId={selectedPostId} />
                    </ModalCmp>
                )}
        </div>
    )
}
