import { utilService } from '../services/util.service'


export function PostOwnerCommentInfoDetailsCard({ owner, postDate, desc }) {
    const postDateFormatted = utilService.formatDate(postDate);
    return (
        <div className="PostOwnerCommentInfoDetailsCard">
            <img className="icon" src={owner.imgUrl} alt="icon" />
            <div className="info">
                <span className="userName">{owner.userName}</span>
                <span className="date">{postDateFormatted}</span>
            </div>
            <span className="comment">{desc}</span>
        </div>
    );
}
