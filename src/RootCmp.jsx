import { Routes, Route } from 'react-router'

import routes from './routes'

// import { AppFooter } from './cmps/AppFooter'
import { UserProfile } from './pages/UserProfile'
import { ActionAlert } from './cmps/ActionAlert'

export function RootCmp() {

    return (
        <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
            <main>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="user/:id" element={<UserProfile />} />
                </Routes>
            </main>
            <ActionAlert/>
        </div>
    )
}
