import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllProcess, getProcessById } from "../services/process";
import Process from "../models/Process";
import { 
    Box, 
    Center, 
    Flex, 
    Grid, 
    useDisclosure } from "@chakra-ui/react";
import Step from "../models/Steps";
import { CardStep } from "../components/Card/cardStep";
import { CardBase } from "../components/Card/cardBase";
import { ModalEtapaForm } from "../components/Modal/ModalEtapaForm";
import { ProcessTabs } from "../components/TabsProcesso";
import { EtapaDrawer } from "../components/Drawer/EtapaDrawer";
import { verifyTokenFetch } from "../services/token";


export const ShowProcess = () => {
    const { id } = useParams();
    const [process, setProcess] = useState(new Process())
    const [processes, setProcesses] = useState(new Array<Process>())
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [steps, setSteps] = useState(new Array<Step>())
    const [step, setStep] = useState(new Step())
    const [gridColumn, setGridColumn] = useState('5')
    useEffect(() => {
        (async () => {
            if (id) {
                await verifyTokenFetch()
                const process = await getProcessById(Number.parseInt(id))
                if (process) {

                    setProcess(process)
                    if (process.steps !== undefined) {
                        setSteps(process.steps)
                    }
                }
            }
            const processList = await getAllProcess()
            if (processList) {
                setProcesses(processList)
            }
        })();


    }, [id])


    return (<>
        <Flex flexDirection={'column'}>
            <Flex>
                <Box>
                    <ProcessTabs process={process} setProcess={setProcess} />
                </Box>
                <Box height={'817px'} width={'1400px'} bgImage={"../../assets/images/Vectorfundo.svg"} style={{ backgroundPosition: "center", backgroundRepeat: "no-repeat" }} >

                    <Grid padding='0.9rem' templateColumns={'repeat(' + gridColumn + ', 1fr)'} gap='10px' flex='1' >
                        {steps.map((step: Step) => {
                            const showInfos = () => {
                                setStep(step)
                                onOpen()
                            }

                            return (<CardStep step={step} onClick={showInfos} />)
                        })}
                        <CardBase width="242px" height="270px" borderRadius="0.4rem" bgColor="#414243" opacity={'0.9'}>
                            <Box padding='0' width='100%' height='100%' >
                                <Center margin='45% auto'>

                                    <ModalEtapaForm
                                        sizeIcon="3rem"
                                        heightIcon={'8'}
                                        widthIcon={'8'}
                                        processId={process.id}
                                        setSteps={setSteps}
                                        steps={steps}

                                    />

                                </Center>
                            </Box>
                        </CardBase>
                    </Grid>
                </Box>
                <EtapaDrawer isOpen={isOpen} onClose={onClose} setStep={setStep} step={step} steps={steps} setSteps={setSteps} />
            </Flex>
        </Flex>
    </>
    )

}