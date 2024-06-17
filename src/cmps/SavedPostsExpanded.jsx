import React from 'react'
import { useNavigate } from 'react-router-dom';
import back from '../assets/img/shared/back.svg'


export function SavedPostsExpanded({ savedPosts, setExpandedSaved }) {
    const navigate = useNavigate()

    function handleGoBack() {
        setExpandedSaved(false)
        navigate(-1)
    }

    return (
        <div className='saved-expanded-view'>
            <button className='saved-button' onClick={handleGoBack}>
              <img src={back} alt="Back Arrow" />
               Saved
            </button>
            <span>All posts</span>
            <div className='expanded-saved-posts-grid'>
                {savedPosts.map((post, index) => (
                    <img
                        key={index}
                        className='saved-post-image'
                        src={post.imgUrl}
                        alt={`saved post ${index}`}
                    />
                ))}
            </div>
        </div>
    );
}
