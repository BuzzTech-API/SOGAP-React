
import { Flex } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"

function DefaultLayout(){
    return(
        <Flex flexDirection="column">
            <Header />
            <Outlet/>
        </Flex>
    )
}

export default DefaultLayout