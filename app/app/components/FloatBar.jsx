import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react"
import {AiFillHome} from 'react-icons/ai'
import {IoMdChatbubbles} from 'react-icons/io'
import Conversations from "./Conversations"
import { useState } from "react"
import Loading from "../../../app/components/Loading"
import { useCookies } from "react-cookie"
import DialogAlertGroup from "../../components/DialogAlertGroup"

const { default: Home } = require("./Home")

const FloatBar = () => {
    const [type, setType] = useState('home')
    const [cookies, setCookie] = useCookies(['groupId'])
    const [open, setOpen] = useState(false)
    return (
        <Tabs value="home">
            <TabsHeader className="w-[20rem] !overflow-y-hidden z-50 fixed left-1/2 -translate-x-1/2 bottom-[5%]">
                <Tab key={"home"} onClick={() => setType('home')} value={"home"}>
                    <AiFillHome size={25} />
                </Tab>
                <Tab key={"conversations"} onClick={() => setType('conversations')} value={"conversations"}>
                    <IoMdChatbubbles size={25} />
                </Tab>
            </TabsHeader>
            <TabsBody>
                <TabPanel value={"home"} key={"home"}>
                    <Home />
                </TabPanel>
                <TabPanel value={"conversations"} key={"conversations"}>
                    <Conversations groupId={cookies.groupId} />
                </TabPanel>
            </TabsBody>
        </Tabs>    
    )
}

export default FloatBar