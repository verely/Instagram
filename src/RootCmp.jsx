import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router'
import { useLocation, Navigate } from 'react-router-dom'

import routes from './routes'

import { ActionAlert } from './cmps/ActionAlert'
import { SideBarNavigation } from './cmps/SideBarNavigation'
import { PostIndex } from './pages/PostIndex'
import { LoginSignUpPage } from './pages/LoginSignUpPage'


export function RootCmp() {

    const location = useLocation()
    const user = useSelector(state => state.userModule.user)
    // console.log("User state:", user)

    const isLoginPage = location.pathname === '/login'

    return (
        <div className={`root-container ${isLoginPage ? 'login-page' : ''}`}>
            <div className='main-layout'>
                {!isLoginPage && <div className='sidebar-wrapper'>
                    <SideBarNavigation />
                </div>}
                <main className='main-wrapper'>
                    <Routes>
                        <Route
                            path="/"
                            element={user ? <PostIndex /> : <Navigate to="/login" replace />}
                        />
                        <Route
                            path="/login"
                            element={
                                !user
                                    ? <LoginSignUpPage />
                                    : <Navigate to="/" replace />
                            }
                        />
                        {routes.map((route, index) => (
                            <Route key={index} path={route.path} element={route.component}>
                                {route.children && route.children.map((childRoute, childIndex) => (
                                <Route key={childIndex} path={childRoute.path} element={childRoute.component} />
                                ))}
                            </Route>
                        ))}
                    </Routes>
                </main>
            </div>
            <ActionAlert/>
        </div>
    )
}
