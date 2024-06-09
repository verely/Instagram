import { ActionButtons } from './ActionButtons'
import { CommentArea } from './CommentArea'
import { PostOwnerInfoCard } from './PostOwnerInfoCard';

export function PostPreview({ post, postActions, isLiked}) {

    return (
        <div className="post-preview">

            <PostOwnerInfoCard owner={post.owner} postDate={post.created_at}/>

            <img className="post-image" src={post.imgUrl} alt={post.imgUrl} />

            <ActionButtons postActions={postActions} post={post} isLiked={isLiked}/>

            <div className="post-message">{post.desc}</div>

            <CommentArea post={post} onAddCommentToPost={postActions.onAddCommentToPost}/>

            <hr/>
        </div>
    );
}
