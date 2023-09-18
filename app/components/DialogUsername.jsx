import { Alert, Button, Dialog, DialogBody, DialogFooter, Input, Typography } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { getUserByUID, registerNickname, verificarNickname } from "../auth/authentication"


function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
    );
}  

const DialogUserName = ({ open, setOpen, userLoggedIn }) => {
    const [cookies, setCookie] = useCookies(['isAuth', 'user'])
    const [nickname, setNickname] = useState('')
    const [reload, setReload] = useState(1)
    const [alert, setAlert] = useState('')

    useEffect(() => {
        handler()
    }, [reload])

    let handleChange = (e) => {
        let regex = /^[a-zA-Z0-9]*$/
        if(regex.test(e.target.value)) setNickname(e.target.value)
    }

    let handler = () => {
        let iHaveId = userLoggedIn.nickname
        if(iHaveId) return setOpen(false)
        return setOpen(true)
    }

    let handleCreate = async (e) => {
        handler()
        setAlert('')
        e.preventDefault()
        if(!nickname) return
        console.log(await verificarNickname("@" + nickname))
        if(await verificarNickname("@" + nickname)) {
            setAlert('Este @ já está em uso')
            return
        }
        setOpen(false)
        await registerNickname(cookies.user.uid, "@" + nickname.toLowerCase())
    }

    return (
        <div>
            <Dialog onClick={() => {console.log('cliquei')}} open={open} handler={handler}>
                <Typography variant="h4" color="black" className="text-center pt-6"> 
                    Crie um @
                </Typography>
                <DialogBody>
                    {alert && (<Alert className="bg-[#ff7171] text-white" icon={<Icon />}>{alert}</Alert>)}
                    <div className="mt-4" />
                    <Input value={nickname} onChange={handleChange} type="text" size="lg" label="Identificador" />
                </DialogBody>
                <DialogFooter>
                    <Button onClick={handleCreate} variant="gradient" color="green">
                        Confirmar
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default DialogUserName