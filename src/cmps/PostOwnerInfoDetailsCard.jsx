
export function PostOwnerInfoDetailsCard({ owner }) {
    return (
        <div className="card-container PostOwnerInfoDetailsCard">
            <img className="icon" src={owner.imgUrl} alt="icon" />
            <span className="userFullName">{owner.fullName}</span>
            <div className="info">
                <span className="userName">{owner.userName}</span>
                <span className="followStatus">Following</span>
            </div>
        </div>
    );
}
