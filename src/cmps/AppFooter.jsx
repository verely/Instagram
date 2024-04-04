
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { UserMsg } from './UserMsg.jsx'

export function AppFooter() {

    return (
        <footer className="app-footer">
            <section>Footer</section>
            <UserMsg />
        </footer>
    )
}
