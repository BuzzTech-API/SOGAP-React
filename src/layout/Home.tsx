import React from "react"
import SideBar from "../components/SideBar"
import { Flex } from "@chakra-ui/react"

function Home(){
    return(
        <Flex flexDirection="row">
            <SideBar/>
            <Flex></Flex>
        </Flex>
    )
}

export default Home