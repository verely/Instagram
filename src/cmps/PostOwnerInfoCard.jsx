import more from '../assets/img/PostPreview/more.svg'
import { utilService } from '../services/util.service'

export function PostOwnerInfoCard({ owner, postDate }) {
    const postDateFormatted = utilService.formatDate(postDate)
    return (
        <div className="card-container PostOwnerInfoCard">
            <img className="icon" src={owner.imgUrl} alt="icon" />
            <div className="info">
                <span className="userName">{owner.userName}</span>
                <span className="date">• {postDateFormatted}</span>
            </div>
            <span className="userFullName">{owner.fullName}</span>
            <div className="menuIcon">
                <img className="svg with-effect" src={more} alt="more" />
            </div>
        </div>
    )
}
