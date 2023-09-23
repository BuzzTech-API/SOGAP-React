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
import VisualizarEtapa from "../components/VizualizarEtapa";

interface ShowProcessProps{
    id:number
}

export const ShowProcess = ()=>{
    const { id } = useParams();
    const [process, setProcess] = useState(new Process())
    const [steps, setSteps] = useState(new Array<Step>())
    const [step, setStep] = useState(new Step())
    const [isVisible, setIsVisible] = useState(false)
    const [gridColumn, setGridColumn] = useState('4')
    const [widthBox, setWidthBox] = useState('92rem')
    useEffect(() => {
        (async () => {
            if (id) {
                const process =await getProcessById(Number.parseInt(id))
                if(process){
                    
                    setProcess(process)
                    if (process.steps!==undefined) {
                        setSteps(process.steps)
                    }
                }
            }
        })();
        

    }, [id])
    
    const closeStepInfos = ()=>{
        setWidthBox('92rem')
        setIsVisible(false)
        setGridColumn('4')
    }
    
    return(
    <Flex textColor='white' flexDirection='row'>

    <Flex textColor='white' flexDirection='column'>
    <Box 
    width={widthBox}
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
    width={widthBox}
    minHeight='45rem'
    marginLeft='1rem'
    marginTop='1rem'
    borderRadius='2rem'
    padding='1rem'
    bg='#58595B'
    
    >
    
        
    <Grid padding='0.9rem' templateColumns={'repeat('+ gridColumn+', 1fr)'} gap='0.9rem' flex='1' >
        {steps.map((step:Step)=> {
            const showInfos = ()=>{
                setIsVisible(true)
                setStep(step)
                setGridColumn('2')
                setWidthBox('46rem')
            }
            
            return(<CardStep onClick={showInfos} key={step.id} step={step} />)
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
        {isVisible && (
            <div>
                <VisualizarEtapa step={step} onClose={closeStepInfos}/>
        </div>
      )}
    
    </Flex>

    )

}