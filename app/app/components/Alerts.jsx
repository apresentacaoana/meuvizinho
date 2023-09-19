'use client'

import { Accordion, AccordionBody, AccordionHeader, Timeline, TimelineBody, TimelineConnector, TimelineHeader, TimelineIcon, TimelineItem, Typography } from "@material-tailwind/react"
import { useState } from "react"
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import Alert from "./Alert"
import {Alert as AlertUI} from '@material-tailwind/react'
import { collection, orderBy, query } from "firebase/firestore"
import { db } from "../../firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import moment from "moment"
import Nothing from "../../components/Nothing"

const Alerts = () => {
    const alertRef = collection(db, "alerts")
    const q = query(alertRef, orderBy('createdAt', 'desc'))
    const [alerts] = useCollection(q, {idField: 'id'})

    const getHoursOrMinutesAgo = (createdAtNanos) => {
        const now = moment.utc();
        const createdAtMilliseconds = createdAtNanos / 1000000;
        const createdAt = moment.utc(createdAtMilliseconds);
        
        const duration = moment.duration(now.diff(createdAt));
    
        const hoursAgo = Math.floor(duration.asHours());
        const minutesAgo = Math.floor(duration.asMinutes()) % 60; // modulus to get remaining minutes
        const secondsAgo = Math.floor(duration.asSeconds()) % 60; // modulus to get remaining seconds
        
        if (hoursAgo > 0) {
           return `${hoursAgo} hora(s) atrás`;
        } else if (minutesAgo > 0) {
           return `${minutesAgo} minuto(s) atrás`;
        } else {
           return `${secondsAgo} segundo(s) atrás`;
        }
    };
    
    
    return (
        <div className="">
            <div className="flex justify-between my-5">
                <Typography className="font-bold text-[16px]">
                    Alertas Recentes
                </Typography>
            </div>
            <div className="flex flex-col gap-4">
                { alerts && alerts.docs.length > 0 ?
                    <>     
                    {alerts && alerts.docs.map((alert) => 
                        {
                            console.log(alert.data().createdAt)
                            return (
                                <Alert data={{author: alert.data().author, hours: getHoursOrMinutesAgo(alert.data().createdAt['nanoseconds']), situacao: alert.data().situacao, tipo: alert.data().tipo, details: alert.data().details}} key={alert.data().id} />
                            )
                        }
                    )}
                    </>
                    : <>
                        <AlertUI color="light-blue">Atualmente não há nenhum alerta emitido em sua vizinhança.</AlertUI>
                    </>
               }
            </div>
        </div>
    )
}

export default Alerts