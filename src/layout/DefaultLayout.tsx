import SideBar from "../components/SideBar"
import { Flex } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"

function DefaultLayout(){
    return(
        <Flex flexDirection="row">
            <SideBar/>
            <Outlet/>
        </Flex>
    )
}

export default DefaultLayout