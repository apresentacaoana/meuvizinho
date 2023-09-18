'use client'
import { useEffect, useState } from "react"
import { criarSolicitacao, getComunityById, getSolicitacoesByComunityId, getUserByUID } from "../../../auth/authentication"
import Header from "../../../components/Header"
import { Avatar, Button, Chip, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react"
import { IoMdPin } from "react-icons/io"
import Nothing from "../../../components/Nothing"
import Loading from "../../../components/Loading"
import {useRouter} from 'next/navigation'
import { useCookies } from "react-cookie"

const IdPage = ({ params }) => {
    const [comunity, setComunity] = useState('')
    const [cookies, setCookie] = useCookies(['isAuth', 'user'])
    const [userLoggedIn, setUser] = useState({})
    const [requests, setRequests] = useState({})
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const [sent, setSent] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const getData = async () => {
            if(!cookies.user) return router.push("/credentials")
            const responseComunity = await getComunityById(params.id)
            const responseRequests = await getSolicitacoesByComunityId(params.id)
            const responseUser = await getUserByUID(cookies.user.uid)
            responseRequests.forEach((request) => {
                if(request.user.uid === cookies.user.uid) setSent(true)
            })
        
            responseComunity.members.map((member) => {
                if(member.uid === cookies.user.uid) setIsUser(true)
            })

            if(responseComunity.creator.uid === cookies.user.uid) setIsUser(true)
        
            setComunity(await responseComunity)
            setUser(await responseUser)
            setLoading(false)


        }
        getData()
    }, [])

    const getId = () => {
        const numeroAleatorio = Math.floor(Math.random() * 99999) + 1000
        return numeroAleatorio
    }

    const handleRequest = async () => {
        setSending(true)
        await criarSolicitacao(comunity, userLoggedIn, getId()).then((e) => {
            setSending(false)
            setSent(true)
            console.log("teste")
        })
        
    }

    return (
        <div>
            {loading ? <Loading /> : (
                <>
                <Header title={"Detalhes"} />            
                {comunity.name ? (
                        <div className="xl:mx-80 md:my-[20px] ">
                        <div className="mt-20 items-center p-5 flex sm:flex-row justify-self-start self-start justify-start w-full flex-col sm:justify-between">
                            <div className="w-full">
                                <Chip variant="ghost" color="red" size="sm" value={`5 ALERTAS`} className="w-fit mb-3" icon={<span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-red-900 content-['']" />} />
                                <Typography variant="h3">{comunity.name}</Typography>
                                <div className="flex gap-3 p-3 bg-green-400 mt-3 rounded-[10px] items-center">
                                    <IoMdPin className="text-white text-[2rem] w-[20%] md:w-auto" />
                                    <Typography className="text-white">{comunity.address}</Typography>
                                </div>

                                {!isUser && (
                                    <Button onClick={handleRequest} disabled={sending || sent} className={`mt-4 w-full ${sent && 'bg-green-300'}`}>
                                        {sent ? (
                                            <>
                                                Solicitação enviada
                                            </>
                                        ) : (
                                            <>
                                                {sending ? 'Solicitação Enviada' : 'Enviar Solicitação'}
                                            </>
                                        )}
                                    </Button>
                                )}

                                <List>
                                    <Typography variant="h4" className="mt-3">Participantes</Typography>
                                    <ListItem className="w-full border shadow-md border-gray-400">
                                        <ListItemPrefix>
                                            <Avatar src={comunity.creator.photoURL} variant="circular" alt="pessoa" />
                                        </ListItemPrefix>
                                        <div className="flex items-center gap-5">
                                            <div>
                                                <Typography variant="h6" className="flex gap-3" color="blue-gray">
                                                {comunity.creator.name} </Typography>
                                                <Typography variant="small" color="gray" className="font-normal">
                                                {comunity.creator.nickname}
                                                </Typography>
                                            </div>
                                            <Chip variant="ghost" color="light-green" size="sm" value={"SÍNDICO"} className="w-fit mb-3 self-start justify-self-start"  icon={<span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />}/>
                                        </div>
                                    </ListItem> 
                                    {comunity.members.map((member) => (
                                        <ListItem key={member.uid} onClick={() => router.push(`/app/chat/private/${member.nickname.replace('@', '')}`)} className="w-full border border-gray-400">
                                            <ListItemPrefix>
                                                <Avatar src={member.photoURL} variant="circular" alt="pessoa" />
                                            </ListItemPrefix>
                                            <div className="flex items-center gap-5">
                                                <div>
                                                    <Typography variant="h6" className="flex gap-3" color="blue-gray">
                                                        {member.name} 
                                                    </Typography>
                                                    <Typography variant="small" color="gray" className="font-normal">
                                                        {member.nickname}
                                                    </Typography>
                                                </div>
                                                { member.role === 'police' && <Chip variant="ghost" color="gray" size="sm" value={`POLICIAL`} className="w-fit mb-3 self-start justify-self-start" icon={<span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-yellow-900 content-['']" />} />}
                                            </div>
                                        </ListItem> 
                                    ))}
                                </List>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Nothing />
                )}
            </>
            )}
        </div>
    )
}

export default IdPage