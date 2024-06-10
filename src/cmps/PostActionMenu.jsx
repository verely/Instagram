import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

export function PostActionMenu({ onClose }) {

    useEffect(() => {
        document.body.classList.add('no-scroll');
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    function onUnFollow(){

    }

    function onGoToPost() {

    }

    function onCopyPostLink() {

    }

    return (
        <div className="post-action-menu">
            <NavLink to="/" className="nav-link onUnFollow" onClick={onUnFollow}>
                Unfollow
            </NavLink>
            <NavLink to="/" className="nav-link" onClick={onGoToPost}>
                Go to post
            </NavLink>
            <NavLink to="/" className="nav-link" onClick={onCopyPostLink}>
                Copy link
            </NavLink>
            <NavLink to="/" className="nav-link" onClick={onClose}>
                Cancel
            </NavLink>
        </div>
    );
}
