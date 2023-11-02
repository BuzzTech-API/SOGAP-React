import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProcessById } from "../services/process";
import Process from "../models/Process";
import {
    Box,
    Card,
    Center,
    Flex,
    useDisclosure
} from "@chakra-ui/react";
import Step from "../models/Steps";
import { CardStep } from "../components/Card/cardStep";
import { CardBase } from "../components/Card/cardBase";
import { ModalEtapaForm } from "../components/Modal/ModalEtapaForm";
import { EtapaDrawer } from "../components/Drawer/EtapaDrawer";

import { ProcessDrawer } from "../components/Drawer/ProcessDrawer";
import { CardStepShowProcess } from "../components/Card/cardStepShowProcess";
import ProgressBar from "../components/ProgressBar";


export const ShowProcess = () => {
    const { id } = useParams();
    const [process, setProcess] = useState(new Process())
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [steps, setSteps] = useState(new Array<Step>())
    const [step, setStep] = useState(new Step())
    const [role] = useState(localStorage.getItem('cargo'))
    const [displayOpen, setDisplayOpen] = useState('flex')
    const [displayTabs, setDisplayTabs] = useState('none')


    useEffect(() => {
        (async () => {
            if (id) {
                
                const process = await getProcessById(Number.parseInt(id))
                if (process) {

                    setProcess(process)
                    if (process.steps !== undefined) {
                        setSteps(process.steps)
                    }
                }
            }
        })();


    }, [id])


    return (<>
        <Flex flexDirection={'row'}>
                <ProcessDrawer 
                process={process} 
                displayOpen={displayOpen} 
                displayTabs={displayTabs} 
                setDisplayOpen={setDisplayOpen} 
                setProcess={setProcess} 
                setDisplayTabs={setDisplayTabs}
                />
                <Box
                    height={['100%', '817px']}
                    width={['100%', '1400px']}
                    display={'flex'}
                >
                    <svg style={{zIndex: -1, position: 'fixed', left: 0, right: 0}} width="100%" height="100%" viewBox="0 0 636 638" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.6" filter="url(#filter0_d_2144_503)">
                            <path d="M618.978 275.032C593.698 243.546 535.292 218.147 462.066 203.187C440.97 84.7198 385.702 0.349025 320.497 0.0011038C255.814 -0.346817 200.023 81.5885 177.009 197.968C43.4593 220.235 -26.9771 275.554 17.1327 330.352C42.0643 361.491 99.4249 386.541 171.256 401.676C189.039 531.972 246.922 627.476 316.486 627.998C340.721 628.172 363.735 616.691 384.133 596.163C441.493 533.19 461.543 440.121 468.342 373.146C470.26 354.358 471.307 334.875 471.307 315.043C471.307 307.389 471.306 299.735 471.132 292.254H471.307C471.307 292.254 471.307 291.733 471.307 290.863C471.307 290.515 471.307 290.341 471.307 290.341L474.096 291.733C499.9 298.343 518.903 307.215 527.272 317.653C539.999 333.483 526.574 349.835 495.192 363.578C493.623 376.799 491.53 389.672 488.915 402.023C602.764 376.625 659.427 325.481 618.978 275.032ZM276.735 76.5437C305.328 76.7176 330.085 121.947 342.464 188.574C305.154 186.835 266.798 187.53 228.79 191.01C221.991 191.705 215.191 192.401 208.566 193.097C221.467 123.861 247.271 76.3697 276.735 76.5437ZM349.961 320.958C346.997 385.497 337.06 413.505 335.665 417.332C321.543 470.912 299.052 505.53 273.771 505.356C261.218 505.356 249.363 496.484 239.076 481.001C215.714 446.731 207.171 388.803 207.171 388.803C171.43 382.54 168.292 381.148 168.292 381.148C164.979 380.104 161.841 379.061 158.703 378.191C138.304 371.928 123.31 364.1 116.162 355.054C102.912 338.528 118.08 321.132 153.124 307.041C160.446 303.91 165.851 302.17 165.851 302.17C261.044 272.075 350.833 277.816 350.833 277.816C350.833 280.077 350.833 282.339 350.833 284.6C350.833 286.862 350.833 289.123 350.833 291.559C350.833 301.474 350.484 311.216 349.961 320.958Z" fill="#54C5CE" fillOpacity="0.8" shapeRendering="crispEdges" />
                        </g>
                        <defs>
                            <filter id="filter0_d_2144_503" x="0" y="0" width="636" height="638" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="6" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2144_503" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2144_503" result="shape" />
                            </filter>
                        </defs>
                    </svg>
                    <Flex
                        padding={['1.7rem','0.9rem']}
                        flexDirection={['row']}
                        h={'100%'}
                        overflowY={'auto'}
                        flexWrap={'wrap'}
                        gap='0.9rem'
                        display={[displayOpen,'flex']}
                    >
                        {steps.map((step: Step) => {
                            const showInfos = () => {
                                setStep(step)
                                onOpen()
                            }

                            return (<CardStepShowProcess step={step} onClick={showInfos} key={step.id} />)
                        })}
                        {role !== null && (role === 'Gerente' || role === 'Lider' || role === 'Administrador') &&
                            <Card  w={'15rem'}
                            maxW={'15rem'}
                            h={'22rem'}
                            maxHeight={'22rem'}
                            borderRadius={'0.5rem'}
                            borderTopRadius={'7.5rem'} 
                            bgColor="#414243" 
                            opacity={'0.9'}
                            verticalAlign={'center'}
                            justify={'center'}
                            >
                                <Box padding='0' width='100%' height='100%' >
                                    <Center margin='65% auto'>

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
                            </Card>}
                    </Flex>
                </Box>
                <EtapaDrawer isOpen={isOpen} onClose={onClose} setStep={setStep} step={step} steps={steps} setSteps={setSteps} />

        </Flex>
    </>
    )

}