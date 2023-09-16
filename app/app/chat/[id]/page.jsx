'use client'
import { useEffect, useState } from "react"
import Alert from "./components/Alert"
import ChatRoom from "./components/ChatRoom"
import Header from "./components/Header"
import { getAlertByID } from "../../../../app/auth/authentication"
import Loading from "../../../../app/components/Loading"
import { useCookies } from "react-cookie"
import { useRouter } from "next/navigation"

const Chat = ({ params }) => {

    const [alerta, setAlerta] = useState({})
    const [loading, setLoading] = useState(true)
    const [cookies, setCookie] = useCookies(['groupId'])
    const router = useRouter()

    useEffect(() => {
        async function getAlerta() {
            await getAlertByID(params.id).then(res => {
                console.log(res.groupId, cookies.groupId)
                if(res.groupId != cookies.groupId) router.push('/app')
                setAlerta(res)
                setLoading(false)
            })
        }
        getAlerta()
    }, [])


    return (
        <>
        {
            loading ? (
                <Loading />
            ) : (
                
            <div>
                <Header alert={alerta} />
                <div className="xl:mx-80 md:my-[20px] m-5">
                    <Alert author={alerta.author} situacao={alerta.situacao} />
                </div>
                <ChatRoom id={params.id} />
            </div>
            )
        }
        </>
    )
}

export default Chat