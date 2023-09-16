'use client'

import { Button, Card, Input, Option, Select, Typography } from "@material-tailwind/react"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import {IoMdPin} from 'react-icons/io'
import {CountryRegionData} from 'react-country-region-selector'
import { Autocomplete, TextField } from "@mui/material"
import axios from "axios"
import { createComunity, getUserByUID } from "../../../../auth/authentication"
import { useCookies } from "react-cookie"

const Form = () => {
    const [nome, setNome] = useState('')
    const [options, setOptions] = useState([])
    const [endereco, setEndereco] = useState('')
    const [userLoggedIn, setUser] = useState({})
    const [cookies, setCookie] = useCookies(['isAuth', 'user'])

    const router = useRouter()

    const getId = () => {
        const numeroAleatorio = Math.floor(Math.random() * 99999) + 1000
        return numeroAleatorio
    }
    
    async function getOptions(text) {
        if(text.length <= 5) {
            return 
        }
        axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=fb9f181a103b4fe688ba54b1665a40d2`).then((res) => {
            let options2 = []
            res.data.features.forEach((feature) => {
                let geo = feature.properties
                options2.push([`${String(geo.address_line1)}, ${String(geo.address_line2)}.`])
            })
            setOptions(options2)
        })
    }

    useEffect(() => {
        async function getUser() {
            if(!cookies.user) return router.push("/credentials")
            const response = await getUserByUID(cookies.user.uid)
            setUser(await response)
            console.log(response)
        }
        getUser()
    }, [])

    const handleCreate = async () => {
        if(!nome || !endereco) return
        await createComunity(nome, endereco, userLoggedIn, getId())
        router.push('/app/community')
    }


    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" className="font-bold text-[25px]" color="blue-gray">
                    Registrar Comunidade
                </Typography>
                <Typography color="gray" className="mt-1 font-normal w-80 sm:w-96">
                    Preencha as informações abaixo para manter sua vizinhança mais segura. 
                </Typography>
                <form className="mt-3 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-3">
                        <Input value={nome} className="placeholder:text-red-500" onChange={e => setNome(e.target.value)} color="blue" size="lg" label="Nome" />
                        <Autocomplete 
                            options={options}
                            size="small"
                            color="lightGreen"
                            getOptionLabel={(option) => option[0]}
                            inputValue={endereco}
                            onInputChange={(event, newInputEvent) => {
                                console.log(newInputEvent)
                                setEndereco(newInputEvent)
                            }}
                            renderInput={(params) => {
                                return (<TextField {...params} value={endereco} onInput={e =>  getOptions(e.target.value)}  label="Endereço" />)
                            }}
                        />
                    </div>
                    <Button onClick={handleCreate} className={'w-full'} color="green">Criar</Button>
                </form>
            </Card>
        </div>
    )
}

export default Form