import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
//import { useParams } from 'react-router-dom'

import { loadUser, login } from '../store/actions/user.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'

import { postService } from '../services/post.service.local'

import post_tab from "../assets/img/UserProfile/post_tab.svg"
import saved_tab from "../assets/img/UserProfile/saved_tab.svg"
import tagged_tab from "../assets/img/UserProfile/tagged_tab.svg"
import loading from "../assets/img/shared/Loading.svg"

export function UserProfile() {
    const [isLoading, setIsLoading] = useState(false)
    const [userPosts, setUserPosts] = useState([])
    const [savedPosts, setSavedPosts] = useState([]);
    const [expandedSaved, setExpandedSaved] = useState(false);
    const [activeTab, setActiveTab] = useState('posts');

    //const { username } = useParams()
    const loggedInUser = useSelector(state => state.userModule.user)
    const currentProfile = useSelector(storeState => storeState.userModule.currentProfile)

    // Dummy login effect
    useEffect(() => {
        const dummyLogin = async () => {
            if (!loggedInUser) {
                const dummyCredentials = {userName: 'Tuppence', password: '123' };
                await login(dummyCredentials);
            }
        };

        dummyLogin();
    }, []);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                if (loggedInUser) {
                    setIsLoading(true);
                    await loadUser(loggedInUser._id)

                    //console.log('try fetchUserPosts')
                    const posts = await postService.getPostsByOwnerId(loggedInUser._id);
                    setUserPosts(posts);
                } else {
                    console.log('loggedInUser is null or undefined, cannot fetch posts.');
                }
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchUserPosts();
    }, [loggedInUser]);


    useEffect(() => {
        const fetchSavedPosts = async () => {
            if (loggedInUser && activeTab === 'saved') {
                try {
                    setIsLoading(true);
                    const savedPostIds = loggedInUser.savedPostIds;
                    console.log("savedPostIds", savedPostIds)
                    const posts = await postService.getPostsByIds(savedPostIds);
                    console.log("saved posts", posts)
                    setSavedPosts(posts);
                } catch (error) {
                    console.error('Failed to fetch saved posts:', error);
                }
                finally
                {
                    setIsLoading(false);
                }
            }
        };

        fetchSavedPosts();
    }, [loggedInUser, activeTab]);

    function onUserUpdate(user) {
        showSuccessMsg(`This user ${user.fullName} just got updated from socket, new score: ${user.score}`)
        store.dispatch({ type: 'SET_CURRENT_PROFILE', user })
    }

    function handleSavedGridClick() {
        setExpandedSaved(true);
    }

    return (
    <section className="user-profile">

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
                />
                ))}
            </div>
            )}
            {activeTab === 'saved' &&!isLoading && (
            <div className='saved-posts-container'>
                <span>Only you can see what you&apos;ve saved</span>
                <div className={`saved-posts-grid ${expandedSaved? 'expanded' : ''}`} onClick={handleSavedGridClick}>
                {savedPosts.slice(0, expandedSaved? savedPosts.length : 4).map((post, index) => (
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
            )}

      </div>
    </section>
    )
    }
