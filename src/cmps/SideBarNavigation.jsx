import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import brandName from '../assets/img/SideBarNavigation/brandName.svg';
import brandIcon from '../assets/img/SideBarNavigation/brandIcon.svg';
import home from '../assets/img/SideBarNavigation/home.svg';
import explore from '../assets/img/SideBarNavigation/explore.svg';
import search from '../assets/img/SideBarNavigation/search.svg';
import messenger from '../assets/img/SideBarNavigation/messenger.svg';
import newPost from '../assets/img/SideBarNavigation/newPost.svg';
import more from '../assets/img/SideBarNavigation/more.svg';
import { CreatePost } from './CreatePost.jsx';
import { login } from '../store/actions/user.actions'

export function SideBarNavigation() {
    const loggedInUser = useSelector(state => state.userModule.user)

    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)

    useEffect(() => {
        const getLoginUser = async ()=> {
            try {
              const credentials={userName:'Tuppence'}
              await login(credentials)
            } catch (error) {
              console.error('Failed to fetch post:', error)
            }
        }

        getLoginUser()
    //}, [username])
    }, [])

    const handleOpenCreatePost = () => {
        setIsCreatePostOpen(true)
     };

    const handleCloseCreatePost = () => {
        setIsCreatePostOpen(false)
     };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed)
    };

    const expand = () => {
        if (isCollapsed) { setIsCollapsed(false) }
    }

    return (
        <div className='sidebar-navigation'>

            <div className="sidebar-mobile-layout">
                <div className="navbar-mobile">
                    <NavLink to="/" className="nav-link">
                        <img src={home} alt="Home" className="nav-icon"/>
                    </NavLink>
                    <NavLink to="/explore" className="nav-link">
                        <img src={explore} alt="Explore" className="nav-icon"/>
                    </NavLink>
                    <NavLink to="/messages" className="nav-link">
                        <img src={messenger} alt="Messenger" className="nav-icon"/>
                    </NavLink>
                    <NavLink className="nav-link">
                    <img src={newPost} alt="CreatePost" className="nav-icon"  />
                    </NavLink>
                    <NavLink to="/profile" className="nav-link">
                        <img src={explore} alt="Profile" className="nav-icon"/>
                    </NavLink>
                </div>
            </div>

            <div className='sidebar-normal-layout'>
                <nav className={`navbar ${isCollapsed ? 'collapsed' : ''}`}>
                    <div className="navbar-brand">
                        {isCollapsed && <img src={isCollapsed? brandIcon : brandName} alt="Brand Name"
                        className={`brand-name ${isCollapsed ? 'collapsed' : ''}`} onClick={expand}/>}

                        {!isCollapsed && <span className="brandName">
                            <img src={brandName} alt="Brand Name"
                            className={`brand-name ${isCollapsed ? 'collapsed' : ''}`} onClick={expand}/>
                        </span> }
                        {!isCollapsed && <span className="brandIcon">
                            <img src={brandIcon} alt="Brand Name"
                            className={`brand-name ${isCollapsed ? 'collapsed' : ''}`} onClick={expand}/>
                        </span> }
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
                        <NavLink to="/message" className="nav-link">
                            <img src={messenger} alt="Messenger" className="nav-icon" onClick={expand}/>
                            {!isCollapsed && <span>Messages</span>}
                        </NavLink>
                        <NavLink className="nav-link" onClick={handleOpenCreatePost}>
                            <img src={newPost} alt="CreatePost" className="nav-icon"  />
                            {!isCollapsed && <span>Create</span>}
                        </NavLink>
                        {loggedInUser &&<NavLink to={`/${loggedInUser.userName}`} className="nav-link" onClick={expand}>
                            <img className="nav-icon profile" src={loggedInUser.imgUrl} alt="Profile"/>
                            {!isCollapsed && <span>Profile</span>}
                        </NavLink>}
                        <NavLink to="/more" className="nav-link">
                            <img src={more} alt="More" className="nav-icon"/>
                            {!isCollapsed && <span>More</span>}
                        </NavLink>
                    </div>
                </nav>
            </div>
            {isCreatePostOpen && <div className='createPost-modal'>
                <CreatePost onClose={handleCloseCreatePost}/>
            </div>}
        </div>
    );
}

