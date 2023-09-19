import Message from "./Message"
import { useCookies } from "react-cookie"
import InputMessage from "./InputMessage"
import { useEffect, useRef, useState } from "react"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { db } from "../../../../../app/firebase"
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore"
import moment from "moment/moment"
import axios from "axios"
import { getAlertByID } from "../../../../auth/authentication"
import Loading from "../../../../components/Loading"

const ChatRoom = ({ id }) => {
    
    const messageRef = collection(db, "messages")
    const queryRef = query(messageRef, orderBy("createdAt", "asc"))
    const [messages] = useCollection(queryRef, {idField: 'uid'})
    const [cookies, setCookie] = useCookies(['groupId'])
    const [alert, setAlert] = useState({})
    const [loading, setLoading] = useState(true)

    const scrollTo = useRef(null)

    useEffect(() => {
        const getData = async () => {
            await getAlertByID(id).then(res => {
                setAlert(res)
                setLoading(false)
            })
            
        }
        getData()
        if(scrollTo.current !== null) {
            
            scrollTo.current.scrollIntoView({behavior: "smooth"})
        }
    }, [messages])

    return (
        <div>
            {loading ? <Loading /> : (
                <div>
                    
                <div className="flex flex-col gap-8 md:mb-[80px] mb-[100px] xl:mx-80 md:my-[20px] m-5">
                {messages && messages.docs.map(msg => (

                    <>
                        {msg.data().groupId == cookies.groupId  && (
                            <>
                                {msg.data().id == Number(id) && (
                                    <Message role={msg.data().role} name={msg.data().author} key={msg.id} text={msg.data().text} photoURL={msg.data().photoURL} createdAt={msg.data().createdAt} uid={msg.data().uid} />    
                                )}
                            </>
                        )}
                    </>

                )
                )}
                <div ref={scrollTo}></div>
            </div>
            <InputMessage messageRef={messageRef} id={id} groupId={cookies.groupId} />
            </div>
            )}
        </div>
    )
}

export default ChatRoom