'use client'
import { motion } from 'framer-motion';
import { getUserByUID, logout } from '../../../app/auth/authentication';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import HorizontalCards from './HorizontalCards';
import Navbar from './Navbar';
import Alerts from './Alerts';
import Welcome from './Welcome';
import DialogUserName from '../../../app/components/DialogUsername';
import { Spinner } from '@material-tailwind/react';
import Loading from '../../../app/components/Loading';
import { useRouter } from 'next/navigation';
import verifierProps from "../../actions/user"
import Notification from './Notification'

const Home = () => {
  const [cookies, setCookie] = useCookies(['user, isAuth']);
  const [person, setPerson] = useState({});
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState('')
  const router = useRouter()
  const [reload, setReload] = useState(0)
  const [loading, setLoading] = useState(true);

  let userHavePhoto = null;
  if (cookies.user) userHavePhoto = cookies.user.photoURL;

  useEffect(() => {
    async function getUser() {
      if(!cookies.user) return router.push("/credentials")
        const response = await getUserByUID(cookies.user.uid);
        setPerson(await response);
        setLoading(false);
    }
    getUser();
  }, [reload]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <motion.div
          className="xl:mx-80 md:my-[20px] m-5 flex min-h-[92.3vh] flex-col"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar userHavePhoto={userHavePhoto} />
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Welcome user={person} />
            <Notification type={verifierProps(person)} />
            <HorizontalCards userLoggedIn={person} />
          </motion.div>
          <motion.div
            className="flex-grow"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Alerts />
          </motion.div>
          <div className='mb-[100px]'></div>
          { !person.nickname && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <DialogUserName userLoggedIn={person} open={open} setOpen={setOpen} setReload={setReload} reload={reload} />
            </motion.div>
          )}
        </motion.div>
      )}
    </>
  );
};

export default Home;
