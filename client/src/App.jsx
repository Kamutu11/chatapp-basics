import './App.css'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3000")

function App() {
  const [ room, setRoom ] = useState("")

  const [ message, setMessage ] = useState("")
  const [ messageRe, setMessageRe ] = useState("")

  const joinRoom = () => {
    if( room !== ""){
      socket.emit("join_room", room)
    }
  }

  const sendMessage = () => {
    socket.emit("send_message", { message, room })
  }

  useEffect(() => {

    socket.on("receive_message", (data) => {
      setMessageRe(data.message)
    })

  }, [socket])

  return (
    <>

      <h1>Room: {room} </h1>
      <div className='messages'>
        {messageRe}
      </div>
      <div className='App'>
        <input
        placeholder='join room'
        onChange={(e) => {
          setRoom(e.target.value)
        }}
        />
        <button onClick={joinRoom}>Join</button>
        
        <input 
        placeholder='message...' 
        onChange={(e) => setMessage(e.target.value)} 
        value={message}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  )
}

export default App
