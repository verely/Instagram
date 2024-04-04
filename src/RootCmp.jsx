import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppFooter } from './cmps/AppFooter'
import { UserProfile } from './pages/UserProfile'

export function RootCmp() {

    return (
        <div>
            <main>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="user/:id" element={<UserProfile />} />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


