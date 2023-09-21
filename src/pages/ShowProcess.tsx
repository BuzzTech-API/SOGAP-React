import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProcessById } from "../services/process";
import Process from "../models/Process";
import { Box, Center, Flex, Grid, Heading, Modal, Text  } from "@chakra-ui/react";
import Step from "../models/Steps";
import { CardStep } from "../components/Card/cardStep";
import { CardBase } from "../components/Card/cardBase";
import FormP from "../components/FormProcess";
import { ModalEtapaForm } from "../components/Modal/ModalEtapaForm";
import EtapaForm from "../components/EtapaForm";
import SideBar from "../components/SideBar/SideBar";

interface ShowProcessProps{
    id:number
}

export const ShowProcess = ()=>{
    const { id } = useParams();
    const [process, setProcess] = useState(new Process())
    const [steps, setSteps] = useState(process.steps)
    useEffect(() => {
        (async () => {
            if (id) {
                const process =await getProcessById(Number.parseInt(id))
                if(process){
                    
                    setProcess(process)
                }
            }
        })();
        

    }, [id])
    
    
    return(
    
    <Flex textColor='white' flexDirection='column'>
    <Box 
    width='92rem'
    height='8rem'
    marginLeft='1rem'
    marginTop='1rem'
    borderRadius='2rem'
    padding='1rem'
    bg='#58595B'
    >
        <Flex flexDirection='column'>
        <Heading
        color='#53C4CD'
        size='lg'
        >
        {process.title}
        </Heading>
        <Text>{process.objective}</Text>
        </Flex>
    </Box>
    <Flex
    width='92rem'
    minHeight='45rem'
    marginLeft='1rem'
    marginTop='1rem'
    borderRadius='2rem'
    padding='1rem'
    bg='#58595B'
    
    >

        
    <Grid padding='0.9rem' templateColumns='repeat(4, 1fr)' gap='0.9rem' flex='1' >
        {process.steps===undefined? <div></div>: process.steps.map((step:Step)=> {
            
            
            return(<CardStep step={step} />)
        })}
            <CardBase width="18rem" height="21rem" bgColor="#1d1e20">
                <Box padding='0' width='100%' height='100%'>
                    <Center margin='45% auto'>
                        
                        <ModalEtapaForm sizeIcon="4rem" heightIcon={'14'} widthIcon={'14'} processId={process.id} setSteps={setSteps} steps={steps} />

                    </Center>
                    
                </Box>
            </CardBase>
            
            
        </Grid>
    </Flex>
    
    </Flex>

    )

}