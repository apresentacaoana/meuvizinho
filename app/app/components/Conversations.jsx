import { useCookies } from "react-cookie"
import Chats from "./Chats"
import Navbar from "./Navbar"
import { useState } from "react"
import Loading from "@/app/components/Loading"

const Conversations = () => {
    const [cookies, setCookie] = useCookies(['user, isAuth'])
    const [loading, setLoading] = useState(true)
    let userHavePhoto = null
    if(cookies.user) userHavePhoto = cookies.user.photoURL
    setTimeout(() => {
        setLoading(false)
    }, 30);
    return (
        <>
            {loading ? (
                <></>
            ) : (
                
                <div className="flex flex-col !overflow-y-hidden justify-between">
                    <div className='xl:mx-80 md:my-[20px] m-5'>
                        <Navbar userHavePhoto={userHavePhoto} profile={false} />
                    </div>
                    <div className="xl:mx-80 flex-grow justify-self-start ">
                        <Chats />
                    </div>
                    <div className="flex-grow"></div>
                </div>
            )}
        </>
    )
}

export default Conversations