import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { loadUser } from '../store/actions/user.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'

export function UserProfile() {

    const params = useParams()
    const user = useSelector(storeState => storeState.userModule.watchedUser)

    useEffect(() => {
        loadUser(params.id)
    }, [])

    function onUserUpdate(user) {
        showSuccessMsg(`This user ${user.fullName} just got updated from socket, new score: ${user.score}`)
        store.dispatch({ type: 'SET_WATCHED_USER', user })
    }

    return (
        <section className="user-profile">
            <h1>User Profile</h1>
            {user && <div>
                <h3>
                    {user.fullName}
                </h3>
                {/* Demo for dynamic images: */}
                <div className="user-img" style={{ backgroundImage: `url('/img/u${0}.png')` }}>
                </div>
                <pre>
                    {JSON.stringify(user, null, 2)}
                </pre>
            </div>}
        </section>
    )
}
