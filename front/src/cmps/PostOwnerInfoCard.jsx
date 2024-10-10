import { useState } from 'react';
import { utilService } from '../services/util.service'
import more from '../assets/img/PostPreview/more.svg'
import { PostActionMenu } from './PostActionMenu'

export function PostOwnerInfoCard({ owner, postDate, postId }) {
    const [showMenu, setShowMenu] = useState(false);

    const postDateFormatted = utilService.formatDate(postDate)

    const handleMenuToggle = () => {
      setShowMenu(!showMenu)
      // console.log('handleMenuToggle')
    };

    return (
        <div className='PostOwnerInfoCard'>

          <div className="PostOwnerInfoCard-layout">
                <img className="icon" src={owner.imgUrl} alt="icon" />
                <div className="info">
                    <span className="userName">{owner.userName}</span>
                    <span className="date">• {postDateFormatted}</span>
                </div>
                <span className="userFullName">{owner.fullName}</span>
                <div className="menuIcon" onClick={handleMenuToggle}>
                    <img className="svg with-effect" src={more} alt="more" />
                </div>
          </div>

          {showMenu && <div className="post-action-menu-modal">
            {<PostActionMenu postId={postId} onClose={() => setShowMenu(false)} />}
          </div>}
        </div>
    )
}
