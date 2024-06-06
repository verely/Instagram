import { ActionButtons } from './ActionButtons'
import { CommentArea } from './CommentArea'

import more from '../assets/img/PostPreview/more.svg'

export function PostPreview({ post, postActions, isLiked}) {

    return (
        <div className="post-preview">

            <div className="post-header">
                <img className="owner-icon" src={post.owner.imgUrl} alt={post.owner.userName} />
                <span className="owner-username">{post.owner.userName}</span>
                <span className="owner-fullName">{post.owner.fullName}</span>
                <span className="date">{post.date}</span>
                <span className="menu">
                    <img className="svg with-effect" src={more} alt="more" />
                </span>
            </div>

            <img className="post-image" src={post.imgUrl} alt={post.imgUrl} />

            <ActionButtons postActions={postActions} post={post} isLiked={isLiked}/>

            <div className="post-message">{post.desc}</div>

            <CommentArea post={post} onAddCommentToPost={postActions.onAddCommentToPost}/>

            <hr/>
        </div>
    );
}
