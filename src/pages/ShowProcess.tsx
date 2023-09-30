import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllProcess, getProcessById } from "../services/process";
import Process from "../models/Process";
import { Box, Center, Flex, Grid, Heading, Spacer, Text  } from "@chakra-ui/react";
import Step from "../models/Steps";
import { CardStep } from "../components/Card/cardStep";
import { CardBase } from "../components/Card/cardBase";
import { ModalEtapaForm } from "../components/Modal/ModalEtapaForm";
import SideBar from "../components/SideBar/SideBar";
import VisualizarEtapa from "../components/VizualizarEtapa";
import { ModalUpdateProcess } from "../components/Modal/ModalEditarProcesso";



export const ShowProcess = ()=>{
    const { id } = useParams();
    const [process, setProcess] = useState(new Process())
    const [processes, setProcesses] = useState(new Array<Process>())
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
            const processList = await getAllProcess()
            if(processList){
                setProcesses(processList)
            }
        })();


    }, [id])
    
    const closeStepInfos = ()=>{
        setWidthBox('92rem')
        setIsVisible(false)
        setGridColumn('4')
    }
    
    return(<>
    <SideBar processes={processes} setProcesses={setProcesses} />
    <Flex textColor='white' flexDirection='row'>

    <Flex textColor='white' flexDirection='column'>
    <Box 
    width={widthBox}
    minHeight='8rem'
    marginLeft='1rem'
    marginTop='1rem'
    borderRadius='2rem'
    padding='1rem'
    bg='#58595B'
    >
        <Flex flexDirection={'row'} gap={'4rem'}>
            <Flex flexDirection='column'>
                <Heading
                color='#53C4CD'
                size='lg'
                >
                {process.title}
                </Heading>
                <Text>{process.description}</Text>
            </Flex>
            <Flex flexDirection='column'>
                <Box bg={'#D9D9D9'} textColor={'#000'} fontSize={'1.5rem'} textAlign={'center'} borderRadius={'1rem'} padding={'0.2rem'}>
                {process.status}
                </Box>
                <Text
                >Objetivo: {process.objective}
                </Text>
            </Flex>
            <Spacer />
            <ModalUpdateProcess />
        </Flex>
    </Box>
    <Flex
    width={widthBox}
    marginLeft='1rem'
    marginTop='1rem'
    borderRadius='2rem'
    padding='1rem'
    bg='#58595B'
    maxHeight='45rem'
    height={'45rem'}
    overflow={'auto'}
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
                        
                        <ModalEtapaForm 
                        sizeIcon="4rem" 
                        heightIcon={'14'} 
                        widthIcon={'14'} 
                        processId={process.id} 
                        setSteps={setSteps} 
                        steps={steps} 
                        
                        />

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
    </>
    )

}