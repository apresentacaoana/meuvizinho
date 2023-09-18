import { Typography } from "@material-tailwind/react"
import { useRouter } from "next/navigation"
import { BsArrowLeftShort } from "react-icons/bs"

const Header = ({ title }) => {
    const router = useRouter()
    return (
        <div className="flex xl:px-80 px-5 z-[500] fixed top-0 py-5  bg-white w-full justify-between items-center">
            <button className='absolute' onClick={() => {router.back()}}>
                <BsArrowLeftShort size={35} className='inline justify-self-start' />
            </button>
            <Typography variant='h4' className='flex-grow text-center'>
                {title}
            </Typography>
        </div>
    )
}

export default Header