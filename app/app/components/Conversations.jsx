import Chats from "./Chats"
import Navbar from "./Navbar"

const Conversations = () => {
    return (
        <div className="h-full min-h-screen flex flex-col !overflow-y-hidden">
            <div className='xl:mx-80 md:my-[20px] m-5'>
                <Navbar />
            </div>
            <div className="xl:mx-80 flex-grow ">
                <Chats />
            </div>
        </div>
    )
}

export default Conversations