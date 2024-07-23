import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_COUNT } from '../store/reducers/post.reducer'

import { utilService } from '../services/util.service'


export function HomePage() {
    const dispatch = useDispatch()
    const count = useSelector(storeState => storeState.postModule.count)

    function changeCount(diff) {
        console.log('Changing count by:', diff);
        dispatch({ type: CHANGE_COUNT, diff })
    }

    return (
        <section>
            <h2>
                Count {count}
                <button onClick={() => {
                    changeCount(1)
                }}>+</button>
                <button onClick={() => {
                    changeCount(10)
                }}>+10</button>
            </h2 >
            <img src={utilService.getAssetSrc('react.svg')} />
        </section >
    )
}
