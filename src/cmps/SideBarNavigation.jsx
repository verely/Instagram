import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import brandName from '../assets/img/SideBarNavigation/brandName.svg';
import brandIcon from '../assets/img/SideBarNavigation/brandIcon.svg';
import home from '../assets/img/SideBarNavigation/home.svg';
import explore from '../assets/img/SideBarNavigation/explore.svg';
import search from '../assets/img/SideBarNavigation/search.svg';
import messenger from '../assets/img/SideBarNavigation/messenger.svg';
import newPost from '../assets/img/SideBarNavigation/newPost.svg';
import more from '../assets/img/SideBarNavigation/more.svg';
import { NARROW_BREAKPOINT } from '../constants.js';


export function SideBarNavigation({handleOpenCreatePost}){
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const expand = () => {
        if (isCollapsed) { setIsCollapsed(false) }
    }

    useEffect(() => {
        const breakpoint = NARROW_BREAKPOINT;

        const checkViewportWidth = () => {
            if (window.innerWidth < breakpoint) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };

        checkViewportWidth();

        window.addEventListener('resize', checkViewportWidth);

        return () => {
            window.removeEventListener('resize', checkViewportWidth);
        };
    }, []);

    return (
        <nav className={`navbar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="navbar-brand">
                <img src={isCollapsed? brandIcon : brandName} alt="Brand Name"
                     className={`brand-name ${isCollapsed ? 'collapsed' : ''}`} onClick={expand}/>
            </div>
            <div className="navbar-nav">
                <NavLink to="/" className="nav-link">
                    <img src={home} alt="Home" className="nav-icon" onClick={expand}/>
                    {!isCollapsed && <span>Home</span>}
                </NavLink>
                <NavLink to="/search" className="nav-link" onClick={toggleCollapse}>
                    <img src={search} alt="Search" className="nav-icon"/>
                    {!isCollapsed && <span>Search</span>}
                </NavLink>
                <NavLink to="/explore" className="nav-link">
                    <img src={explore} alt="Explore" className="nav-icon" onClick={expand}/>
                    {!isCollapsed && <span>Explore</span>}
                </NavLink>
                <NavLink to="/messages" className="nav-link">
                    <img src={messenger} alt="Messenger" className="nav-icon" onClick={expand}/>
                    {!isCollapsed && <span>Messages</span>}
                </NavLink>
                <NavLink className="nav-link" onClick={handleOpenCreatePost}>
                   <img src={newPost} alt="CreatePost" className="nav-icon"  />
                    {!isCollapsed && <span>Create</span>}
                </NavLink>
                <NavLink to="/profile" className="nav-link" onClick={expand}>
                    <img src={explore} alt="Profile" className="nav-icon"/>
                    {!isCollapsed && <span>Profile</span>}
                </NavLink>
                <NavLink to="/more" className="nav-link">
                    <img src={more} alt="More" className="nav-icon"/>
                    {!isCollapsed && <span>More</span>}
                </NavLink>
            </div>
        </nav>
    );
}

