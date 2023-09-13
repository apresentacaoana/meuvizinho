'use client'

import { Accordion, AccordionBody, AccordionHeader, Timeline, TimelineBody, TimelineConnector, TimelineHeader, TimelineIcon, TimelineItem, Typography } from "@material-tailwind/react"
import { useState } from "react"
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import Alert from "./Alert"

const Alerts = () => {
    
    return (
        <div>
            <div className="flex justify-between my-5">
                <Typography className="font-bold text-[16px]">
                    Alertas Recentes
                </Typography>
                <Typography className="font-bold text-green-400 text-[16px] ">
                    Ver todos
                </Typography>
            </div>
            <div className="flex flex-col gap-4">
                <Alert data={{"id": 1, "type": "Invasão", "hours": 5, "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet leo id arcu elementum scelerisque. Nulla a eros eros. Mauris et vestibulum massa. Vivamus scelerisque enim a dui euismod iaculis. Etiam faucibus augue magna, a suscipit arcu sollicitudin eget. Suspendisse massa elit, placerat at dui vitae, luctus porta arcu."}} />
                <Alert data={{"id": 2, "type": "Invasão", "hours": 5, "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet leo id arcu elementum scelerisque. Nulla a eros eros. Mauris et vestibulum massa. Vivamus scelerisque enim a dui euismod iaculis. Etiam faucibus augue magna, a suscipit arcu sollicitudin eget. Suspendisse massa elit, placerat at dui vitae, luctus porta arcu."}} />
                <Alert data={{"id": 3, "type": "Invasão", "hours": 5, "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet leo id arcu elementum scelerisque. Nulla a eros eros. Mauris et vestibulum massa. Vivamus scelerisque enim a dui euismod iaculis. Etiam faucibus augue magna, a suscipit arcu sollicitudin eget. Suspendisse massa elit, placerat at dui vitae, luctus porta arcu."}} />
                <Alert data={{"id": 4, "type": "Invasão", "hours": 5, "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet leo id arcu elementum scelerisque. Nulla a eros eros. Mauris et vestibulum massa. Vivamus scelerisque enim a dui euismod iaculis. Etiam faucibus augue magna, a suscipit arcu sollicitudin eget. Suspendisse massa elit, placerat at dui vitae, luctus porta arcu."}} />
                <Alert data={{"id": 5, "type": "Invasão", "hours": 5, "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet leo id arcu elementum scelerisque. Nulla a eros eros. Mauris et vestibulum massa. Vivamus scelerisque enim a dui euismod iaculis. Etiam faucibus augue magna, a suscipit arcu sollicitudin eget. Suspendisse massa elit, placerat at dui vitae, luctus porta arcu."}} />
                <Alert data={{"id": 6, "type": "Invasão", "hours": 5, "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet leo id arcu elementum scelerisque. Nulla a eros eros. Mauris et vestibulum massa. Vivamus scelerisque enim a dui euismod iaculis. Etiam faucibus augue magna, a suscipit arcu sollicitudin eget. Suspendisse massa elit, placerat at dui vitae, luctus porta arcu."}} />
            </div>
        </div>
    )
}

export default Alerts