
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { ActionAlert } from './ActionAlert.jsx'

export function AppFooter() {

    return (
        <footer className="app-footer">
            <section>Footer</section>
            <ActionAlert />
        </footer>
    )
}
