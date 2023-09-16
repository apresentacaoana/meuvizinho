'use client'
import { Avatar, Button, Chip, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react"
import Header from "../../components/Header"
import {IoMdPin} from 'react-icons/io'
import { useCookies } from "react-cookie"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import Nothing from '../../components/Nothing'
import { getComunityByUser, getUserByUID } from "../../auth/authentication"
import Loading from "../../components/Loading"

const ComunityHome = () => {
    const [cookies, setCookie] = useCookies(["isAuth", "user"])
    const [userLoggedIn, setUser] = useState({})
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [comunity, setComunity] = useState({})

    useEffect(() => {
        const getData = async () => {
            if(!cookies.user) {
                router.push("/credentials")
                setLoading(false)
                return
            }

            const response = await getUserByUID(cookies.user.uid)
            const responseComu = await getComunityByUser(cookies.user.uid)
            setUser(await response)
            setComunity(await responseComu)
            console.log(responseComu)
            setLoading(false)
        }
        getData()
    }, [])

    return (
        <div>
            {loading ? <Loading /> : (
                <>
                <Header title={"Vizinhança"} />            
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
                                <List>
                                    <Typography variant="h4" className="mt-3">Participantes</Typography>
                                    <ListItem className="w-full border shadow-md border-gray-400">
                                        <ListItemPrefix>
                                            <Avatar src={comunity.creator.photoURL} variant="circular" alt="pessoa" />
                                        </ListItemPrefix>
                                        <div>
                                            <Typography variant="h6" className="flex gap-3" color="blue-gray">
                                            {comunity.creator.name} <Chip variant="ghost" color="light-green" size="sm" value={"SÍNDICO"} className="w-fit"  icon={<span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />}/>
                                            </Typography>
                                            <Typography variant="small" color="gray" className="font-normal">
                                            {comunity.creator.nickname}
                                            </Typography>
                                        </div>
                                    </ListItem> 
                                    {comunity.members.map((member) => (
                                        <ListItem key={member.uid} onClick={() => router.push(`/app/chat/private/${member.nickname.replace('@', '')}`)} className="w-full border border-gray-400">
                                            <ListItemPrefix>
                                                <Avatar src={member.photoURL} variant="circular" alt="pessoa" />
                                            </ListItemPrefix>
                                            <div>
                                                <Typography variant="h6" className="flex gap-3" color="blue-gray">
                                                {member.name}
                                                </Typography>
                                                <Typography variant="small" color="gray" className="font-normal">
                                                {member.nickname}
                                                </Typography>
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

export default ComunityHome