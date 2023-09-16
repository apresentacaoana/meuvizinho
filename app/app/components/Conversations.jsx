import { useCookies } from "react-cookie"
import Chats from "./Chats"
import Navbar from "./Navbar"
import { useEffect, useState } from "react"
import Loading from "../../../app/components/Loading"

const Conversations = ({ groupId }) => {
    const [loading, setLoading] = useState(true)
    const [cookies, setCookie] = useCookies(['user, isAuth'])
    let userHavePhoto = null
    if(cookies.user) userHavePhoto = cookies.user.photoURL
    useEffect(() => {
        if(cookies.user) setLoading(false)
    }, [])
    return (
        <>
            {loading ? (
                <>
                    <Loading />
                </>
            ) : (
                
                <div className="flex flex-col !overflow-y-hidden justify-between">
                    <div className='xl:mx-80 md:my-[20px] m-5'>
                        <Navbar userHavePhoto={userHavePhoto} profile={false} />
                    </div>
                    <div className="xl:mx-80 flex-grow justify-self-start ">
                        <Chats groupId={groupId} />
                    </div>
                    <div className="flex-grow"></div>
                </div>
            )}
        </>
    )
}

export default Conversations