import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Tabs,
  TabList,
  Tab,
  TabIndicator,
  TabPanels,
  TabPanel,
  Box,
  Text,
  VStack,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Center,
  DrawerHeader,
  CloseButton,
} from "@chakra-ui/react"
import Step from "../../models/Steps"
import { SetStateAction, useEffect, useState } from "react"
import { StepUser } from "../../interfaces/stepInterface"
import RequestForEvidence from "../../models/RequestForEvidence"
import { AccordionRequests } from "../Accordion/AccordionRequests"
import { ModalSolicitaEvidencia } from "../Modal/BtnPedirEvidencia"
import { ModalUpdateStep } from "../Modal/ModalEditarEtapa"
import { formatDateToBrasil } from "../../services/formatDate"
import { BtnDeleteEtapa } from "../BtnDeleteEtapa"
import { CardStepShowProcess } from "../Card/cardStepShowProcess"
import useBreakpoint from "../../hooks/useBreakpoint"

interface propsED {
  isOpen: boolean,
  onClose: () => void
  step: Step,
  setStep: React.Dispatch<SetStateAction<Step>>,
  steps: Step[],
  setSteps: React.Dispatch<SetStateAction<Step[]>>,

}

export const EtapaDrawer = ({ step, setStep, isOpen, onClose, steps, setSteps }: propsED) => {
  const [requests, setRequests] = useState(step.requests)
  const [role] = useState(localStorage.getItem('cargo'))
  const breakpoint = useBreakpoint()
  const [size, setSize] = useState('lg')
  const [displayCard, setDisplayCard] = useState('flex')
  let bgColor: string;
  if (step.priority === 'Alta') {
    bgColor = '#FF2828'
  } else if (step.priority === 'Média') {
    bgColor = '#DD6B20'
  } else {
    bgColor = '#38A169'
  }

  useEffect(() => {
    if (breakpoint ==='xs') {
      setSize('full')
      setDisplayCard('none')
    } else if (breakpoint ==='sm') {
      setSize('full')
      setDisplayCard('none')
    } else {
      setSize('lg')
      setDisplayCard('flex')
    }
  
    return () => {
      
    }
  }, [breakpoint])
  

  return (
    <Drawer isOpen={isOpen} size={size} onClose={onClose}>
      <DrawerOverlay backgroundColor={"rgba(0, 0, 0, 0.8)"}>
     
        <Center
        w={'35%'}
        h={'100%'}
        display={displayCard}
        >
           <CardStepShowProcess step={step} steps={steps} key={step.id} onClick={function (): void {
            ''
          }} />
        </Center>
        <DrawerContent opacity={0.9}>
          <DrawerHeader bg={'#1B1C1E'} opacity={0.9} padding={['0.2rem', 'auto']}><CloseButton color={'white'} onClick={onClose} /> </DrawerHeader>
          <DrawerBody
            bg={'#1B1C1E'}
            opacity={0.9}
            color={'#FFF'}
            w={['100vw', '100%']}
            padding={['0.1rem', 'auto']}
            overflowY={'auto'}
            h={['100vh', 'auto']}
          >
            <Tabs
              variant="enclosed"
              isManual
              isFitted
              textColor={'white'}
              w={['100vw', '100%']}
              padding={['0.3rem 0.1rem', 'auto']}
              h={['95vh', 'auto']}
            >
              <TabList w={['100vw', '100%']} overflowX={'auto'}>
                <Tab>Dados</Tab>
                <Tab>Responsáveis</Tab>
                <Tab>Requisição de Evidência</Tab>
                {role !== null && (role === 'Gerente' || role === 'Lider' || role === 'Administrador') &&
                  <Tab>Ações</Tab>}
              </TabList>

              <TabIndicator zIndex={-1} height="4px" bg="green.200" />

              <TabPanels
                w={['100vw', '100%']}
                padding={['0.3rem 0.1rem', 'auto']}

              >
                <TabPanel w={['100vw', '100%']} maxH={'100%'} overflowY={'auto'} >
                  <VStack spacing={['1rem', '2rem']}>
                    <Box
                      textAlign={'center'}
                    >
                      <Text
                        fontSize={'md'}
                        fontWeight={'semibold'}
                        color={'#65FFF1'}
                        marginBottom={'0.5rem'}
                      >Nome da Etapa</Text>
                      <Box
                        color={'#FFF'}
                        bgColor={'#58595B'}
                        width={['15rem', '30rem']}
                        height={'5rem'}
                        borderRadius={'0.5rem'}
                        padding={'0.3rem'}
                        overflow={'hidden'}
                        textAlign={'center'}
                      >{step.name}</Box>

                    </Box>
                    <Box
                      textAlign={'center'}
                    >
                      <Text
                        fontSize={'md'}
                        fontWeight={'semibold'}
                        color={'#65FFF1'}
                        marginBottom={'0.5rem'}
                      >Objetivo</Text>
                      <Box
                        color={'#FFF'}
                        bgColor={'#58595B'}
                        width={['15rem', '30rem']}
                        height={'15rem'}
                        borderRadius={'0.5rem'}
                        padding={'0.3rem'}
                        overflow={'hidden'}
                        textAlign={'center'}
                      >{step.objective}</Box>

                    </Box>
                    <Box
                      textAlign={'center'}
                    >
                      <Text
                        fontSize={'md'}
                        fontWeight={'semibold'}
                        color={'#65FFF1'}
                        marginBottom={'0.5rem'}
                      >Prazo</Text>
                      <Box
                        color={'#FFF'}
                        bgColor={'#58595B'}
                        width={'14rem'}
                        height={'2rem'}
                        borderRadius={'0.5rem'}
                        padding={'0.3rem'}
                        overflow={'hidden'}
                        textAlign={'center'}
                      >{step.endingDate !== undefined && formatDateToBrasil(step.endingDate.toString())}</Box>

                    </Box>
                    <Box
                      textAlign={'center'}
                    >
                      <Text
                        fontSize={'md'}
                        fontWeight={'semibold'}
                        color={'#65FFF1'}
                        marginBottom={'0.5rem'}
                      >Status</Text>
                      <Box
                        color={'#FFF'}
                        bgColor={'#58595B'}
                        width={'14rem'}
                        height={'2rem'}
                        borderRadius={'0.5rrem'}
                        padding={'0.3rem'}
                        overflow={'hidden'}
                        textAlign={'center'}
                      >{step.status}</Box>
                    </Box>
                    <Box
                      textAlign={'center'}
                    >
                      <Text
                        fontSize={'md'}
                        fontWeight={'semibold'}
                        color={'#65FFF1'}
                        marginBottom={'0.5em'}
                      >Prioridade</Text>
                      <Box
                        color={'#FFF'}
                        width={'14rem'}
                        height={'2rem'}
                        borderRadius={'0.5rem'}
                        padding={'0.3rem'}
                        overflow={'hidden'}
                        textAlign={'center'}
                        backgroundColor={bgColor}
                      >{step.priority}</Box>
                    </Box>
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <Accordion allowToggle>
                    {step.users.map((userStep: StepUser) => {
                      return (<AccordionItem key={userStep.user_id}>
                        <AccordionButton height="44px" alignSelf="stretch">
                          <Text

                            lineHeight="1.5"
                            fontWeight="semibold"
                            fontSize="md"
                            color="#FFFFFF"
                            flex="1"
                          >
                            {userStep.user.name}
                          </Text>
                        </AccordionButton>
                        <AccordionPanel width={'400px'}>
                          <Text

                            lineHeight="1.5"
                            fontWeight="regular"
                            fontSize="md"
                            color="#FFFFFF"
                          >
                            {userStep.user.role}
                          </Text>
                          <Text

                            lineHeight="1.5"
                            fontWeight="regular"
                            fontSize="md"
                            color="#FFFFFF"
                          >
                            {userStep.user.team}
                          </Text>
                          <Text

                            lineHeight="1.5"
                            fontWeight="regular"
                            fontSize="md"
                            color="#FFFFFF"
                            alignSelf="stretch"
                          >
                            {userStep.user.email}
                          </Text>
                        </AccordionPanel>
                      </AccordionItem>)
                    })}

                  </Accordion>
                </TabPanel>
                <TabPanel alignItems={'center'} alignContent={'center'}>
                  <Accordion allowToggle>
                    {step.requests.map((requestForEvidence: RequestForEvidence) => {
                      return (<AccordionRequests key={requestForEvidence.id} steps={steps} setSteps={setSteps} requestForEvidenceI={requestForEvidence} setRequests={setRequests} process_id={step.process_id} step={step} setStep={setStep} />)
                    })}
                  </Accordion>
                  {
                    role !== null &&
                    (role === 'Gerente' || role === 'Lider' || role === 'Administrador') &&
                    <ModalSolicitaEvidencia requests={requests} setRequests={setRequests} step={step} setStep={setStep} steps={steps} setSteps={setSteps} />
                  }
                </TabPanel>
                {
                  role !== null &&
                  (role === 'Gerente' || role === 'Lider' || role === 'Administrador') &&
                  <TabPanel>
                    <Center>
                      <ModalUpdateStep step={step} steps={steps} setSteps={setSteps} setStep={setStep} />
                      <BtnDeleteEtapa etapa={step} steps={steps} setSteps={setSteps} onCloseD={onClose} />
                    </Center>
                  </TabPanel>
                }
              </TabPanels>
            </Tabs>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}