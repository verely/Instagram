import { PostOwnerInfoDetailsCard } from './PostOwnerCommentInfoDetailsCard'
import { PostOwnerCommentInfoDetailsCard } from './PostOwnerCommentInfoDetailsCard'
import { PostCommentList } from './PostCommentList'
import { ActionButtons } from './ActionButtons'
import { CommentArea } from './CommentArea'

export function PostDetails() {
    return (
        <div className="post-details">
            <PostOwnerInfoDetailsCard/>
            <PostOwnerCommentInfoDetailsCard />
            <PostCommentList/>
            <ActionButtons/>
            <CommentArea/>
        </div>
    )
}
