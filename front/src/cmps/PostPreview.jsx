import { ActionButtons } from './ActionButtons'
import { CommentArea } from './CommentArea'
import { PostOwnerInfoCard } from './PostOwnerInfoCard';

export function PostPreview({ post, postActions, isLiked}) {
    return (
        <div className="post-preview">

            <PostOwnerInfoCard owner={post.owner} postDate={post.created_at} postId={post._id}/>

            <img className="post-image" src={post.imgUrl} alt={post.imgUrl} />

            <ActionButtons postActions={postActions} post={post} isLiked={isLiked}/>

            <div className="post-message">{post.desc}</div>

            {post.commentCount > 0 && (
                <div className="post-message">
                    {post.commentCount === 1 ? 'View 1 comment' : `View all ${post.commentCount} comments`}
                </div>
            )}
            <CommentArea post={post} onAddCommentToPost={postActions.onAddCommentToPost}/>

            <hr/>
        </div>
    );
}
