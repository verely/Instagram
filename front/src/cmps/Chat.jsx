import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'


export function Chat() {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [isBotMode, setIsBotMode] = useState(true)

    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    const botTimeoutRef = useRef()

    useEffect(() => {
        return () => {

            botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
        }
    }, [])


    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function sendBotResponse() {
        // Handle case: send single bot response (debounce).
        botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
        botTimeoutRef.current = setTimeout(() => {
            setMsgs(prevMsgs => ([...prevMsgs, { from: 'Bot', txt: 'You are amazing!' }]))
        }, 1250)
    }

    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Me'
        const newMsg = { from, txt: msg.txt }
        if (isBotMode) sendBotResponse()
        setMsg({ txt: '' })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    return (
        <section className="chat">
            <h2>Lets Chat</h2>

            <label>
                <input type="checkbox" name="isBotMode" checked={true}
                    onChange={({ target }) => setIsBotMode(target.checked)} />
                Bot Mode
            </label>

            <div>


            </div>

            <form onSubmit={sendMsg}>
                <input
                    type="text" value={msg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" />
                <button>Send</button>
            </form>

            <ul>
                {msgs.map((msg, idx) => (<li key={idx}>{msg.from}: {msg.txt}</li>))}
            </ul>
        </section>
    )
}
