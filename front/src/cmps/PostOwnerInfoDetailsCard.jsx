
import { useState } from 'react'
import more from '../assets/img/PostPreview/more.svg'
import { PostActionMenu } from './PostActionMenu'


export function PostOwnerInfoDetailsCard({ owner, postId, onDeleteAction, isOwner }) {
    const [showMenu, setShowMenu] = useState(false)

    const handleMenuToggle = () => {
        setShowMenu(!showMenu)
    }

    const onDelete = () => {
        onDeleteAction(postId)
        setShowMenu(false)
    }

    return (
        <div className="PostOwnerInfoDetailsCard">
            <img className="icon" src={owner.imgUrl} alt="icon" />
            <span className="userFullName">{owner.fullName}</span>
            <div className="info">
                <span className="userName">{owner.userName}</span>
                <span className="point">•</span>
                <span className="followStatus">Following</span>
            </div>
            <div className="menuIcon" onClick={handleMenuToggle}>
                    <img className="svg with-effect" src={more} alt="more" />
            </div>

            {showMenu && <div className="post-action-menu-modal">
                {<PostActionMenu postId={postId} onClose={() => setShowMenu(false)}
                  onDelete={onDelete} isOwner={isOwner}/>}
            </div>}
        </div>
    )
}
