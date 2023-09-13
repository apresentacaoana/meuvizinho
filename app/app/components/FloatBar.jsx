import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react"
import {AiFillHome} from 'react-icons/ai'
import {IoMdChatbubbles} from 'react-icons/io'
import Conversations from "./Conversations"

const { default: Home } = require("./Home")

const FloatBar = () => {

    return (
        <Tabs value="home">
            <TabsHeader className="w-[20rem] z-50 fixed left-1/2 -translate-x-1/2 bottom-[5%]">
                <Tab key={"home"} value={"home"}>
                    <AiFillHome size={25} />
                </Tab>
                <Tab key={"conversations"} value={"conversations"}>
                    <IoMdChatbubbles size={25} />
                </Tab>
            </TabsHeader>
            <TabsBody>
                <TabPanel value={"home"} key={"home"}>
                    <Home />
                </TabPanel>
                <TabPanel value={"conversations"} key={"conversations"}>
                    <Conversations />
                </TabPanel>
            </TabsBody>
        </Tabs>    
    )
}

export default FloatBar