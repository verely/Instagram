import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import brandName from '../assets/img/SideBarNavigation/brandName.svg'
import brandIcon from '../assets/img/SideBarNavigation/brandIcon.svg'
import homeActive from '../assets/img/SideBarNavigation/home.svg'
import home from '../assets/img/SideBarNavigation/home-outline.svg'
import explore from '../assets/img/SideBarNavigation/explore.svg'
import exploreActive from '../assets/img/SideBarNavigation/explore-active.svg'
import search from '../assets/img/SideBarNavigation/search.svg'
import searchActive from '../assets/img/SideBarNavigation/search-active.svg'
import messenger from '../assets/img/SideBarNavigation/messenger.svg'
import messengerActive from '../assets/img/SideBarNavigation/messenger-active.svg'
import newPost from '../assets/img/SideBarNavigation/newPost.svg'
import more from '../assets/img/SideBarNavigation/more.svg'
import { CreatePost } from './CreatePost.jsx'
import { MoreMenu } from './MoreMenu.jsx'
import { SidebarSearch } from './SidebarSearch.jsx'


export function SideBarNavigation({expandSidebar}) {
    const loggedInUser = useSelector(state => state.userModule.user)

    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
    const moreMenuRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
                setIsMoreMenuOpen(false)
            }
        }

        if (isMoreMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isMoreMenuOpen])


    const handleOpenCreatePost = () => {
        setIsCreatePostOpen(true)
    }

    const handleCloseCreatePost = () => {
        setIsCreatePostOpen(false)
    }

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed)
    }

    const onSearchClick = () => {
        expandSidebar(!isCollapsed)
        toggleCollapse()
    }

    const expand = () => {
        if (isCollapsed) {
            expandSidebar(false)
            setIsCollapsed(false) }
    }

    function onMoreMenuToggle() {
        setIsMoreMenuOpen(!isMoreMenuOpen)
    }

    return (
        <div className='sidebar-navigation'>

            <div className="sidebar-mobile-layout">
                <div className="navbar-mobile">
                    <NavLink to="/" className="nav-link">
                        {({ isActive }) => (
                             <img src={isActive ? homeActive : home} alt="Home" className="nav-icon"/>
                        )}
                    </NavLink>
                    <NavLink to="/explore" className="nav-link">
                        {({ isActive }) => (
                             <img src={isActive ? exploreActive: explore} alt="Explore" className="nav-icon"/>
                        )}
                    </NavLink>
                    <NavLink to="/messages" className="nav-link">
                        {({ isActive })=>(
                            <img src={isActive ? messengerActive: messenger} alt="Messenger" className="nav-icon"/>
                        )}
                    </NavLink>
                    <NavLink className="nav-link">
                        <img src={newPost} alt="CreatePost" className="nav-icon"  />
                    </NavLink>
                        {loggedInUser &&<NavLink to="/profile" className="nav-link">
                        <img src={loggedInUser.imgUrl} alt="Profile" className="nav-icon profile"/>
                    </NavLink>}
                </div>
            </div>

            <div className='sidebar-normal-layout'>
                <nav className={`navbar ${isCollapsed ? 'collapsed' : ''}`}>
                    <div className="navbar-brand">
                        {isCollapsed && <img src={brandIcon} alt="Brand Icon" className="brand-icon" onClick={expand}/>}

                        {!isCollapsed && <span className="brand-name">
                            <img src={brandName} alt="Brand Name"
                            className={`brand-name ${isCollapsed ? 'collapsed' : ''}`} onClick={expand}/>
                        </span> }
                        {!isCollapsed && <span className="brand-icon">
                            <img src={brandIcon} alt="Brand Icon"
                            className={`brand-icon ${isCollapsed ? 'collapsed' : ''}`} onClick={expand}/>
                        </span> }
                    </div>
                    <div className="navbar-nav">
                        <NavLink to="/" className="nav-link">
                            {({ isActive }) => (
                                <>
                                    <img src={isActive ? homeActive : home} alt="Home" className="nav-icon" onClick={expand} />
                                    {!isCollapsed && <span>Home</span>}
                                </>
                            )}
                        </NavLink>
                        <NavLink to="/search" className="nav-link search" onClick={onSearchClick}>
                            <img src={isCollapsed ? searchActive : search} alt="Search" className="nav-icon" />
                            {!isCollapsed && <span>Search</span>}
                        </NavLink>
                        <NavLink to="/explore" className="nav-link">
                            {({ isActive }) => (
                                <>
                                    <img src={isActive ? exploreActive: explore} alt="Explore" className="nav-icon" onClick={expand}/>
                                    {!isCollapsed && <span>Explore</span>}
                                </>
                            )}
                        </NavLink>
                        <NavLink to="/message" className="nav-link">
                            {({ isActive })=>(
                                <>
                                    <img src={isActive ? messengerActive : messenger} alt="Messenger" className="nav-icon" onClick={expand}/>
                                    {!isCollapsed && <span>Messages</span>}
                                </>
                            )}
                        </NavLink>
                        <NavLink className="nav-link create" onClick={handleOpenCreatePost}>
                            <img src={newPost} alt="CreatePost" className="nav-icon"  />
                            {!isCollapsed && <span>Create</span>}
                        </NavLink>
                        {loggedInUser &&<NavLink to={`/${loggedInUser.userName}`} className="nav-link" onClick={expand}>
                            <img className="nav-icon profile" src={loggedInUser.imgUrl} alt="Profile"/>
                            {!isCollapsed && <span>Profile</span>}
                        </NavLink>}
                        <div className="more-link-wrapper">
                            <NavLink to="/more" className="nav-link" onClick={onMoreMenuToggle}>
                                <img src={more} alt="More" className="nav-icon"/>
                                {!isCollapsed && <span>More</span>}
                            </NavLink>
                            {isMoreMenuOpen && (
                                <div className='more-menu-wrapper' ref={moreMenuRef}>
                                    <MoreMenu />
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
                {isCollapsed && <SidebarSearch/>}
            </div>

            {isCreatePostOpen && <div className='createPost-modal'>
                <CreatePost onClose={handleCloseCreatePost}/>
            </div>}
        </div>
    )
}
