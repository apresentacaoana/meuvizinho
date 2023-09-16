'use client'
import { Avatar, Chip, IconButton, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react"
import Header from "../../../components/Header"
import Loading from "../../../components/Loading"
import {FaHandsHelping} from 'react-icons/fa'
import {BsCheck2} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'
import { useEffect, useState } from "react"
import { aceitarSolicitacao, getSolicitacoesByComunityId, recusarSolicitacao } from "../../../auth/authentication"
import { collection, query, where } from "firebase/firestore"
import { db } from "../../../firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import Nothing from "../../../components/Nothing"

const RequestIdPage = ({ params }) => {

    const [requests, setRequests] = useState()
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(0)
    useEffect(() => {
        const getData = async () => {
            const response = await getSolicitacoesByComunityId(params.id)
            setRequests(await response)
            setLoading(false)
            console.log(response)
            // setRequests(requestsC)
            // setLoading(false)
        }
        getData()
    }, [reload, params.id])

    const handleAccept = async (id) => {
        await aceitarSolicitacao(id)
        setReload(reload + 1)
    }

    const handleDeny = async (id) => {
        await recusarSolicitacao(id)
        setReload(reload + 1)
    }

    return (
        <div>
            {loading ? (
                <>
                    <Loading />
                </>
            ) : (
                <div>
                    <Header title={"Solicitações"} />
                    {requests.length > 0 ? (
                                            <div className="xl:mx-80 md:my-[20px] m-5">
                                            <List className="mt-20 ">
                                                {requests.map((request) => (
                                                    <ListItem key={request.id} className="border shadow-md border-gray-400">
                                                        <ListItemPrefix>
                                                            <Avatar src={request.user.photoURL} />
                                                        </ListItemPrefix>
                                                        <div className="flex justify-between items-center w-full">
                                                            <div>
                                                                <Chip variant="ghost" color="gray" size="sm" value={request.user.nickname.toLowerCase()} className="w-fit lowercase" />
                                                                <Typography>
                                                                    {request.user.name}
                                                                </Typography>
                                                            </div>
                                                            <div className="flex gap-2 sm:gap-5">
                                                                <IconButton onClick={(e) => handleAccept(request.id)} color="green" size="sm" className="rounded-full" variant="gradient">
                                                                    <BsCheck2 size={20} />
                                                                </IconButton>
                                                                <IconButton onClick={(e) => handleDeny(request.id)} color="red" size="sm" className="rounded-full" variant="gradient">
                                                                    <AiOutlineClose size={20} />
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </div>
                    ) : (
                        <Nothing />
                        
                    )}
                </div>
            )}
        </div>
    )
}

export default RequestIdPage