
import { Flex } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import SideBar from "../components/SideBar/SideBar"

function DefaultLayout(){
    return(
        <Flex flexDirection="row">
            <Outlet/>
        </Flex>
    )
}

export default DefaultLayout