import Chats from "./Chats"
import Navbar from "./Navbar"

const Conversations = () => {
    return (
        <div className="flex flex-col !overflow-y-hidden justify-between">
            <div className='xl:mx-80 md:my-[20px] m-5'>
                <Navbar />
            </div>
            <div className="xl:mx-80 flex-grow justify-self-start ">
                <Chats />
            </div>
            <div className="flex-grow"></div>
        </div>
    )
}

export default Conversations