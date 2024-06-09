import { utilService } from '../services/util.service';


export function PostOwnerCommentInfoDetailsCard({ owner, postDate }) {
    const postDateFormatted = utilService.formatDate(postDate);
    return (
        <div className="card-container PostOwnerCommentInfoDetailsCard">
            <img className="icon" src={owner.imgUrl} alt="icon" />
            <div className="info">
                <span className="userName">{owner.userName}</span>
                <span className="date">• {postDateFormatted}</span>
            </div>
            <span className="comment">{owner.comment}</span>
        </div>
    );
}
