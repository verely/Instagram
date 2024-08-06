import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { loadUser, loadGuestUser } from '../store/actions/user.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'

import { postService } from '../services/post.service'

import post_tab from '../assets/img/UserProfile/post_tab.svg'
import saved_tab from '../assets/img/UserProfile/saved_tab.svg'
import tagged_tab from '../assets/img/UserProfile/tagged_tab.svg'
import loading from '../assets/img/shared/loading.svg'

import { SavedPostsExpanded } from '../cmps/SavedPostsExpanded'
import { PostDetails } from '../cmps/PostDetails'
import { ModalCmp } from '../cmps/ModalCmp'

export function UserProfile() {
    const [isLoading, setIsLoading] = useState(false)
    const [userPosts, setUserPosts] = useState([])
    const [savedPosts, setSavedPosts] = useState([])
    const [expandedSaved, setExpandedSaved] = useState(false)
    const [activeTab, setActiveTab] = useState('posts')
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedPostId, setSelectedPostId] = useState(null)

    const loggedInUser = useSelector(state => state.userModule.user)
    const currentProfile = useSelector(storeState => storeState.userModule.currentProfile)


    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                if (loggedInUser) {
                    setIsLoading(true)
                    if (loggedInUser.isGuest)
                        await loadGuestUser()
                    else
                        await loadUser(loggedInUser._id)

                    const posts = await postService.getPostsByOwnerId(loggedInUser._id)
                    setUserPosts(posts)
                } else {
                    console.log('loggedInUser is null or undefined, cannot fetch posts.')
                }
            } catch (err) {
                console.error('Failed to fetch posts:', err)
            }
            finally {
                setIsLoading(false)
            }
        }

        fetchUserPosts()
    }, [loggedInUser])


    useEffect(() => {
        const fetchSavedPosts = async () => {
            if (loggedInUser && activeTab === 'saved') {
                try {
                    setIsLoading(true)
                    const savedPostIds = loggedInUser.savedPostIds
                    console.log("savedPostIds", savedPostIds)
                    const posts = await postService.getPostsByIds(savedPostIds)
                    console.log("saved posts", posts)
                    setSavedPosts(posts)
                } catch (err) {
                    console.error('Failed to fetch saved posts:', err)
                }
                finally
                {
                    setIsLoading(false)
                }
            }
        }

        fetchSavedPosts()
    }, [loggedInUser, activeTab])

    function onUserUpdate(user) {
        showSuccessMsg(`This user ${user.fullName} just got updated from socket, new score: ${user.score}`)
        store.dispatch({ type: 'SET_CURRENT_PROFILE', user })
    }

    function handleSavedGridClick() {
        setExpandedSaved(true);
        navigate("saved/all-posts/")
    }

    const onGoToPost = (e, postId) => {
        setSelectedPostId(postId)
        setIsModalOpen(true)
        window.history.replaceState(null, '', `/p/${postId}`) //update the URL without full navigation
    }

    const closeModal = () => {
        setIsModalOpen(false)
        navigate(`/${loggedInUser.userName}`, { replace: true, state: { modal: false } });
    }

    if (expandedSaved) {
        return <SavedPostsExpanded savedPosts={savedPosts} setExpandedSaved={setExpandedSaved} />
    }

    return (
        <div className='user-profile'>
          <div className="profile-content">
            {currentProfile && userPosts && (
            <div className="profile-user-info">
                <img className="profile-user-img" src={loggedInUser.imgUrl} alt="icon" />
                <div className="profile-activity-data">
                <div className="profile-name-and-settings">
                    <span className="userName">{loggedInUser.userName}</span>
                    <button>Edit Profile</button>
                </div>
                <div className="profile-activity-numbers">
                    <div className="activityCount"><span>{userPosts.length}</span> posts</div>
                    <div className="activityCount"><span>{currentProfile.followersCount}</span> followers</div>
                    <div className="activityCount"><span>{currentProfile.followingCount}</span> following</div>
                </div>
                <span className="userFullName">{loggedInUser.fullName}</span>
                </div>
            </div>
            )}
            <div className="tab-view">
                <div className='tab-menu'>
                    <button className={`tab ${activeTab === 'posts'? 'active' : ''}`} onClick={() => setActiveTab('posts')}>
                    <img className="tab_icon" src={post_tab} alt="post_grid_icon" />
                    <span>POSTS</span>
                    </button>
                    <button className={`tab ${activeTab === 'saved'? 'active' : ''}`} onClick={() => setActiveTab('saved')}>
                    <img className="tab_icon" src={saved_tab} alt="post_grid_icon" />
                    <span>SAVED</span>
                    </button>
                    <button className={`tab ${activeTab === 'tagged'? 'active' : ''}`} onClick={() => setActiveTab('tagged')}>
                    <img className="tab_icon" src={tagged_tab} alt="post_grid_icon" />
                    <span>TAGGED</span>
                    </button>
                </div>
                {isLoading && <div className="loader-container">
                    <img className={`loading-icon ${isLoading ? '' : 'hidden'}`} src={loading} alt="Loading..." />
                </div>}
                {activeTab === 'posts' &&!isLoading && (
                <div className='user-posts'>
                    {userPosts.map((post, index) => (
                    <img
                        key={index}
                        className="profile-post-image"
                        src={post.imgUrl}
                        alt={`post image ${index}`}
                        onClick = {(e) => onGoToPost(e, post._id)}
                    />
                    ))}
                </div>
                )}
                {activeTab === 'saved' &&!isLoading && (
                    <div className='saved_tab'>
                        <div className='saved-posts-container'>
                            <span className='private-message'>Only you can see what you&apos;ve saved</span>
                            <div className='saved-posts-grid' onClick={handleSavedGridClick}>
                            {savedPosts.slice(0, 4).map((post, index) => (
                                <img
                                key={index}
                                className='saved-post-image'
                                src={post.imgUrl}
                                alt={`saved post ${index}`}
                                />
                            ))}
                            </div>
                            <span className='all_posts'>All posts</span>
                        </div>
                    </div>
                )}

                {isModalOpen && (
                    <ModalCmp onClose={closeModal}>
                        <PostDetails postId={selectedPostId} />
                    </ModalCmp>
                )}
            </div>
          </div>
        </div>
    )
    }
