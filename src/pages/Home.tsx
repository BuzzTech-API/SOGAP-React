import React, { useEffect, useState } from "react"
import { Box, Center, Flex, Grid, IconButton, useDisclosure} from "@chakra-ui/react"
import Process from "../models/Process"
import { ProcessInterface } from "../interfaces/processInterface"
import User from "../models/User"
import { CardProcess } from "../components/Card/cardProcesso"
import { CardBase } from "../components/Card/cardBase"
import { AddIcon } from "@chakra-ui/icons"
import FormP from "../components/FormProcess"
import { getAllProcess } from "../services/process"
import { Link } from "react-router-dom"

export const Home = () => {
    const [processes, setProcesses] = useState(new Array<Process>())
    useEffect(() => {
        (async () => {
            
                const processList = await getAllProcess()
                if(processList){
                    setProcesses(processList)
                }
            
            })();
        }, [])

        
        
    return(<div>

        <Grid marginLeft='1rem' templateColumns='repeat(4, 1fr)' gap='1.5rem' >
            {processes.map((process:Process) =>{
                return <Link to={`/process/${process.id}`}><CardProcess key={process.id}
                process={process}                
                /></Link>
                

            })}
            <CardBase width="20rem" height="25rem">
                <Box padding='0' width='100%' height='100%'>
                    <Center margin='50% auto'>
                        
                        <FormP sizeIcon="14" heightIcon={14} widthIcon={14} />

                    </Center>
                    
                </Box>
            </CardBase>
            
        </Grid>
    </div>

    )
}