import { NavLink } from 'react-router-dom'
import { logout } from '../store/actions/user.actions'

export function MoreMenu() {

    function onLogOut(){
        logout()
    }

    return (
        <div className="more-menu">
            <NavLink to="/login" className="more-nav-link" onClick={onLogOut}>
                Log out
            </NavLink>
        </div>
    );
}
