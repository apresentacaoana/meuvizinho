'use client'
import Alert from "./components/Alert"
import ChatRoom from "./components/ChatRoom"
import Header from "./components/Header"
import InputMessage from "./components/InputMessage"

const Chat = () => {
    return (
        <div>
            <Header />
            <div className="xl:mx-80 md:my-[20px] m-5">
                <Alert />
            </div>
            <ChatRoom />
        </div>
    )
}

export default Chat