'use client'
import { Button, Dialog, DialogBody, DialogFooter, Input, Option, Select, Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import { emitirAlerta, getComunities } from '../auth/authentication'
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'

const DialogAlert = ({ open, handler, userLoggedIn }) => {
    const [situacao, setSituacao] = useState('')
    const [comunities, setComunities] = useState()
    const [tipo, setTipo] = useState('')
    const [cookies, setCookie] = useCookies(['groupId'])
    const router = useRouter()

    const getId = () => {
        const numeroAleatorio = Math.floor(Math.random() * 99999) + 1000
        return numeroAleatorio
    }


    const handleEmit = async () => {
        if(!situacao) return
        if(!tipo) return
        let id = getId()
        await emitirAlerta(id, tipo, situacao, userLoggedIn, cookies.groupId).then(() => {
            router.push(`/app/chat/${id}`)
            handler()
        })
    }

    return (
        <div>
            <Dialog className={"bg-[#fff] text-black"} open={open} handler={handler}>
                <div className="flex items-center justify-between p-4">
                    <Typography variant="h4" color="black" className="text-center text-black"> 
                        Emitir um Alerta
                    </Typography>
                    <AiOutlineClose size={25} onClick={handler} />
                </div>
                <DialogBody>
                    <div className="mt-2" />
                    <Typography className='text-black'>Como é a situação?</Typography>
                    <Select onChange={(e) => {setTipo(e)}} value={tipo} size="lg" >
                        <Option value='ocorrendoagora'>Ocorrendo Agora</Option>
                        <Option value='tentativa'>Tentativa</Option>
                        <Option value='suspeita'>Suspeita</Option>
                    </Select>
                    <div className="mt-3" />
                    <Typography className='text-black'>O que está acontecendo?</Typography>
                    <Select onChange={(e) => {setSituacao(e)}} value={situacao}  size="lg">
                        <Option value='invasao'>Invasão</Option>
                        <Option value='assalto'>Assalto</Option>
                        <Option value='furto'>Furto</Option>
                    </Select>
                    <div className="mt-2" />
                </DialogBody>
                <DialogFooter>
                    <Button onClick={handleEmit} variant="filled">
                        Emitir
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default DialogAlert