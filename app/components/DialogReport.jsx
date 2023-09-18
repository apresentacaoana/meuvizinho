'use client'
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Textarea } from "@material-tailwind/react"
import { useState } from "react"
import { report } from "../auth/authentication"

const DialogReport = ({open, handler, userLoggedIn, alert}) => {
    const [details, setDetails] = useState('')
    const handleSave = async () => {
        if(!details) return
        await report(userLoggedIn, alert, details)
        handler()
    }
    return (
        <Dialog open={open} handler={handler}>
            <DialogHeader>
                Denunciar Alerta
            </DialogHeader>
            <DialogBody divider className="flex flex-col gap-4">
                <span className="">
                    Seja mais específico(a), por qual motivo deseja denunciar esse alerta?
                </span>
                <Textarea value={details} onChange={(e) => setDetails(e.target.value)} label="Detalhes" />
            </DialogBody>
            <DialogFooter className="flex gap-5">
                <Button color="red" onClick={handler}>Cancelar</Button>
                <Button onClick={handleSave}>Denunciar</Button>
            </DialogFooter>
        </Dialog>
    )
}

export default DialogReport