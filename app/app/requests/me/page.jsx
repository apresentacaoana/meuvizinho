'use client'
import { Chip, IconButton, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react"
import Header from "../../../components/Header"
import {FaHandsHelping} from 'react-icons/fa'
import {BsCheck2} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'
import { useEffect, useState } from "react"
import { getSolicitacoesByUser, getUserByUID } from "../../../auth/authentication"
import { useCookies } from "react-cookie"
import Loading from "../../../components/Loading"
import Nothing from "../../../components/Nothing"

const RequestPage = () => {

    const [cookies, setCookie] = useCookies(['isAuth', 'user'])
    const [userLoggedIn, setUser] = useState({})
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const getData = async () => {
            await getUserByUID(cookies.user.uid).then(async (res) => {
                setUser(res)
                console.log(res)
                const getRequests = await getSolicitacoesByUser(res.uid)
                setRequests(await getRequests)
                setLoading(false)
            })
        }
        getData()
    }, [])

    return (
        <>
            {loading ? (
                <Loading />
            ): (
                <div>
                    <Header title={"Minhas Solicitações"} />
                    {requests.length > 0 ? (
                        <>
                        <div className="xl:mx-80 md:my-[20px] m-5">
                            <List className="mt-20 ">
                                {requests.map((request) => (
                                    <ListItem key={request.id} className="border border-gray-400">
                                        <ListItemPrefix>
                                            <FaHandsHelping size={30} />
                                        </ListItemPrefix>
                                        <div className="flex justify-between items-center w-full">
                                            <div>
                                                <Chip variant="ghost" color="yellow" size="sm" value={request.status} className="w-fit" icon={<span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-yellow-900 content-['']" />} />
                                                <Typography>
                                                    {request.comunity.name}
                                                </Typography>
                                            </div>
                                        </div>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                        <div className="xl:mx-80 md:my-[20px] m-5">
                            <List className="mt-20 ">
                                {requests.map((request) => (
                                    <ListItem key={request.id} className="border border-gray-400">
                                        <ListItemPrefix>
                                            <FaHandsHelping size={30} />
                                        </ListItemPrefix>
                                        <div className="flex justify-between items-center w-full">
                                            <div>
                                                <Chip variant="ghost" color="yellow" size="sm" value={request.status} className="w-fit" icon={<span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-yellow-900 content-['']" />} />
                                                <Typography>
                                                    {request.comunity.name}
                                                </Typography>
                                            </div>
                                        </div>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                        </>
                    ): (
                        <Nothing />
                    )}
                </div>
            )}
        </>
    )
}

export default RequestPage