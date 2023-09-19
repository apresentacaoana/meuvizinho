'use client'
import { Accordion, AccordionBody, AccordionHeader, Timeline, TimelineBody, TimelineConnector, TimelineHeader, TimelineIcon, TimelineItem, Typography } from "@material-tailwind/react"
import { useState } from "react"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

const Alert = ({ data }) => {
    const [open, setOpen] = useState(0)
    const handleOpen = value => setOpen(open === value ? 0 : value)

    const tipoParse = {
        "ocorrendoagora": "Ocorrendo",
        "tentativa": "Tentativa de",
        "suspeita": "Suspeita de"
    }

    const situacaoParse = {
        "assalto": "Assalto",
        "invasao": "Invasão",
        "furto": "Furto"
    }

    return (
        <Accordion icon={open === data.id ? <AiOutlineMinus className="text-green-400" size={20} /> : <AiOutlinePlus className="text-green-400" size={20} />} open={open === data.id} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
            <AccordionHeader
            onClick={() => handleOpen(data.id)}
            className={`border-b-0 text-[15px] text-black transition-colors ${
                open === data.id ? "text-green-400 hover:!text-green-800" : ""
            }`}
            >
            {tipoParse[data.tipo]} {situacaoParse[data.situacao]}
            </AccordionHeader>
            <AccordionBody className="pt-3 text-base font-normal">
                <Timeline>
                    <TimelineItem>
                        <TimelineConnector />
                        <TimelineHeader className="h-3">
                            <TimelineIcon />
                            <Typography variant="h6" color="blue-gray" className="leading-none">
                                Alerta emitido há {data.hours}
                            </Typography>
                        </TimelineHeader>
                        <TimelineBody className="pb-3">

                        </TimelineBody>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineConnector />
                        <TimelineHeader className="h-3">
                            <TimelineIcon />
                            <Typography variant="h6" color="blue-gray" className="leading-none">
                                Onde este alarme foi emitido?
                            </Typography>
                        </TimelineHeader>
                        
                        <TimelineBody className="">
                            <Typography variant="small" className="font-normal text-gray-600">
                                {data.author.street}, {data.author.address_number}. {data.author.city}, {data.author.state}.
                            </Typography>
                        </TimelineBody>
                    </TimelineItem>
                </Timeline>
            </AccordionBody>
        </Accordion>
    )
}

export default Alert