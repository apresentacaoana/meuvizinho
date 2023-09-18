'use client'

import { List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react"
import Header from "../../../components/Header"
import {TbReport} from 'react-icons/tb'
import {useState} from 'react'
import {collection, orderBy, query} from 'firebase/firestore'
import {db} from '../../../firebase'
import {useCollection} from 'react-firebase-hooks/firestore'
import moment from 'moment/moment'

const ReportsAdminPage = () => {

    const reportsRef = collection(db, "reports")
    const q = query(reportsRef, orderBy("createdAt", "desc"))
    const [reports] = useCollection(q, {idField: "alert.id"})

    const getHoursOrMinutesAgo = (createdAtNanos) => {
        const now = moment(); // Data e hora atual
        const createdAtMilliseconds = createdAtNanos / 1000000; // Convertendo nanossegundos para milissegundos
        const createdAt = moment(createdAtMilliseconds); // Data e hora da criação
        
        const duration = moment.duration(now.diff(createdAt));
        
        const hoursAgo = duration.hours();
        const minutesAgo = duration.minutes();
        const secondsAgo = duration.seconds();
    
        if (hoursAgo > 0) {
            return `${hoursAgo} hora(s) atrás`;
        } else if (minutesAgo > 0) {
            return `${minutesAgo} minuto(s) atrás`;
        } else {
            return `${secondsAgo} segundo(s) atrás`;
        }
    };

    return (
        <div>
            <Header title={"Denúncias"} />
            <div className="xl:mx-80 md:my-[70px] m-5">
                <List className="mt-[4rem] gap-3">
                    {reports && reports.docs.map((report) => (
                    <ListItem className="bg-red-200 border border-red-400 shadow-md text-white ">
                        <ListItemPrefix className="self-start">
                            <TbReport size={32} />
                        </ListItemPrefix>
                        <div className="flex w-full flex-col">
                            <div className="flex w-full justify-between items-center">
                                <Typography variant="lead" className="text-[15px] font-bold">
                                    Denúncia - #{report.data().alert.id}
                                </Typography>
                                <Typography variant="small">há {getHoursOrMinutesAgo(report.data().createdAt['nanoseconds'])}</Typography>
                            </div>
                            <Typography variant="paragraph" className="text-[13px]">
                                Reportado: <span className="font-bold">{report.data().reported.nickname}</span>
                            </Typography>
                            <Typography variant="paragraph" className="text-[13px]">
                                Quem reportou: <span className="font-bold">{report.data().user.nickname}</span>
                            </Typography>
                            <Typography variant="paragraph" className="text-[13px]">
                                Detalhes: <span className="font-bold">{report.data().details}</span>
                            </Typography>
                        </div>
                    </ListItem>
                    ))}
                </List>
            </div>
        </div>
    )
}

export default ReportsAdminPage