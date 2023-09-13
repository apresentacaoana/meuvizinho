import { Typography } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import {BsArrowLeftShort} from 'react-icons/bs'

const Header = () => {
    const router = useRouter()
    return (
        <div className="flex xl:px-80 px-5 z-50 fixed top-0 py-5  bg-[#DF1525] rounded-b-[20px] text-white w-full justify-between items-center">
            <button className='absolute' onClick={() => {router.back()}}>
                <BsArrowLeftShort size={35} className='inline justify-self-start' />
            </button>
            <Typography variant='h4' className='flex-grow text-center'>
                Emitir um Alerta
            </Typography>
        </div>
    )
}

export default Header