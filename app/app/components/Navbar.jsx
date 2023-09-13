import { Typography } from "@material-tailwind/react"
import { useState } from "react"
import { PiUserCircleFill } from "react-icons/pi"
import ProfileDrawer from "./ProfileDrawer"
import Image from "next/image"

const Navbar = ({ userHavePhoto, profile = true }) => {
    const [open, setOpen] = useState(false)
    const openDrawer = () => setOpen(true)
    const handleClose = () => setOpen(false)
    return (
        <div>
          <div className="flex justify-between items-center">
            <Typography variant='h4'>
              meu<span className='text-green-400'>vizinho.</span>
            </Typography>
            {profile && (
              <>
                {userHavePhoto ? (
                  <>
                    <img
                        onClick={openDrawer}
                        width={35}
                        height={35}
                        alt="foto do usuario"
                        src={userHavePhoto}
                        className='h-[35px] hover:cursor-pointer w-[35px] rounded-full'
                    />
                  </>
                ) : (
                  <PiUserCircleFill
                    onClick={openDrawer}
                    className="hover:cursor-pointer"
                    size={35}
                  />
                )}
              </>
            )}
          </div>
          <ProfileDrawer open={open} handleClose={handleClose} />
        </div>
    )
}

export default Navbar