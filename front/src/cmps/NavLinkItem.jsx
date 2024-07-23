import { NavLink as RouterNavLink } from 'react-router-dom';

export function NavLinkItem({link}) {
    const { route, title, iconUrl } = link;
    return (
        <div className="nav-link">
            <RouterNavLink to={route} className="nav-link" activeClassName="active">
                <img src={iconUrl} alt={title} className="nav-icon" />
                <span className="nav-title">{title}</span>
            </RouterNavLink>
        </div>
    );
}
