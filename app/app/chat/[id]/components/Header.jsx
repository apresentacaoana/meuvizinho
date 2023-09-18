import { IconButton, Tooltip, Typography } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import {BsArrowLeftShort} from 'react-icons/bs'
import {RiPoliceCarLine} from 'react-icons/ri'
import {PiWarningBold} from 'react-icons/pi'
import DialogReport from '../../../../components/DialogReport'
import {useState} from 'react'

const Header = ({ alert, userLoggedIn }) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const handler = () => setOpen(!open)
    const situacao = {
        "assalto": "Assalto",
        "furto": "Furto",
        "invasao": "Invasão"
    }
    return (
        <div className="flex xl:px-80 px-5 z-50 fixed top-0 py-5  bg-white w-full justify-between items-center">
            <button className={`${alert.author.uid == userLoggedIn.uid && 'absolute'}`} onClick={() => {router.back()}}>
                <BsArrowLeftShort size={35} className='inline justify-self-start' />
            </button>
            <Typography variant='h4' className='flex-grow text-center'>
                Alerta de {situacao[alert.situacao]}
            </Typography>     
            <DialogReport open={open} handler={handler} alert={alert} userLoggedIn={userLoggedIn} />
            <div className="flex gap-3">
                {userLoggedIn.role == 'police' && (
                    <IconButton variant='' className='' >
                        <RiPoliceCarLine size={25} />
                    </IconButton>
                )}
                { userLoggedIn.uid !== alert.author.uid &&
                    <Tooltip content={"Denunciar por Alerta Falso"}>
                        <IconButton onClick={handler} color='red'>
                            <PiWarningBold size={25} />
                       </IconButton>
                    </Tooltip>
                }
            </div>
        </div>
    )
}

export default Header