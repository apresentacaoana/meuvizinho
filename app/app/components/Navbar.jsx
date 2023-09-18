import { Typography } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import { PiUserCircleFill } from "react-icons/pi"
import ProfileDrawer from "./ProfileDrawer"
import Image from "next/image"
import { getUserByUID } from "../../auth/authentication"
import { useCookies } from "react-cookie"
import Loading from "../../components/Loading"

const Navbar = ({ userHavePhoto, profile = true}) => {
    const [open, setOpen] = useState(false)
    const openDrawer = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [loading, setLoading] = useState(true)
    const [userLoggedIn, setUser] = useState({})
    const [cookies, setCookie] = useCookies(["isAuth", "user"])
    useEffect(() => {
      const getData = async () => {
        await getUserByUID(cookies.user.uid).then((res) => {
          setUser(res)
          setTimeout(() => {
            setLoading(false)
          }, 100);
        })
      }
      getData()
    }, [])
    return (
        <>
          {loading ? (
            <></>
          ) : (
            <div>
          <div className="flex justify-between items-center">
            <Typography variant='h4'>
              meu<span className='text-green-400'>vizinho.</span>
            </Typography>
            {profile && (
              <>
                {userLoggedIn ? (
                  <>
                    <img
                        onClick={openDrawer}
                        width={35}
                        height={35}
                        alt="foto do usuario"
                        src={userLoggedIn.photoURL}
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
          )}
        </>
    )
}

export default Navbar