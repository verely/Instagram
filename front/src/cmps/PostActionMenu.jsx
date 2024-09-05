import { useNavigate, NavLink } from 'react-router-dom'
import { useEffect } from 'react'

export function PostActionMenu({ postId, onClose, onDelete, isOwner, showGoToPost = true }) {
    const navigate = useNavigate()

    useEffect(() => {
        document.body.classList.add('no-scroll');
        return () => {
            document.body.classList.remove('no-scroll');
        }
    }, [])

    function onUnFollow(){

    }

    const onGoToPost = (e) => {
        e.preventDefault()
        navigate(`/p/${postId}`)
        onClose() // Close the menu after navigating
    }

    function onCopyPostLink() {

    }

    return (
        <div className="post-action-menu">
            <NavLink to="/" className="nav-link onUnFollow" onClick={onUnFollow}>
                Unfollow
            </NavLink>
            {isOwner && (
                <NavLink to="/" className="nav-link" onClick={() => onDelete(postId)}>
                    Delete
                </NavLink>
            )}
            {showGoToPost && <NavLink to="/p/:id" className="nav-link" onClick={onGoToPost}>
                Go to post
            </NavLink>}
            <NavLink to="/" className="nav-link" onClick={onCopyPostLink}>
                Copy link
            </NavLink>
            <NavLink to="/" className="nav-link" onClick={onClose}>
                Cancel
            </NavLink>
        </div>
    )
}
