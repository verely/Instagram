import { Routes, Route } from 'react-router'

import routes from './routes'

// import { AppFooter } from './cmps/AppFooter'
import { ActionAlert } from './cmps/ActionAlert'
import { SideBarNavigation } from './cmps/SideBarNavigation'

export function RootCmp() {

    return (
        <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
            <div className='main-layout'>
                <div className='sidebar-wrapper'>
                    <SideBarNavigation />
                </div>
                <main className='content-wrapper'>
                    <Routes>
                        {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    </Routes>
                </main>
            </div>
            <ActionAlert/>
        </div>
    )
}
