export function UserInfoCard({user}) {
    return (
    <div className="user-info-card">
      <img className="user-icon" src={user.imgUrl} alt={user.userName} />
      <span className="username">{user.userName}</span>
      <span className="fullName">{user.fullName}</span>
    </div>
    )
}
