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
} from "@chakra-ui/react"
import Step from "../../models/Steps"
import { SetStateAction, useState } from "react"
import { StepUser } from "../../interfaces/stepInterface"
import RequestForEvidence from "../../models/RequestForEvidence"
import { AccordionRequests } from "../AccordionRequests"
import { ModalSolicitaEvidencia } from "../Modal/BtnPedirEvidencia"
import { ModalUpdateStep } from "../Modal/ModalEditarEtapa"
import { formatDateToBrasil } from "../../services/formatDate"
import { BtnDeleteEtapa } from "../BtnDeleteEtapa"
import { CardStep } from "../Card/cardStep"

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
  const [role, setRole] = useState(localStorage.getItem('cargo'))

  let bgColor: string;
  if (step.priority === 'Alta') {
    bgColor = '#FF2828'
  } else if (step.priority === 'Média') {
    bgColor = '#DD6B20'
  } else {
    bgColor = '#38A169'
  }

  return (
    <Drawer isOpen={isOpen} size={'lg'} onClose={onClose}>
      <DrawerOverlay opacity={0.9} backgroundColor={"rgba(0, 0, 0, 0.7)"}>
        <CardStep step={step} onClick={()=>{}} />
        <DrawerContent opacity={0.9}>
          <DrawerBody bg={'#1B1C1E'} opacity={0.9} color={'#FFF'}>
            <Tabs variant="enclosed" isManual isFitted textColor={'white'}>
              <TabList>
                <Tab>Dados</Tab>
                <Tab>Responsáveis</Tab>
                <Tab>Requisição de Evidência</Tab>
                {role !== null && (role === 'Gerente' || role === 'Lider' || role === 'Administrador') &&
                  <Tab>Ações</Tab>}
              </TabList>

              <TabIndicator zIndex={-1} height="4px" bg="green.200" />

              <TabPanels>
                <TabPanel>
                  <VStack spacing={'2rem'}>
                    <Box
                      textAlign={'center'}
                      marginTop={'2rem'}
                    >
                      <Text
                        fontSize={'md'}
                        fontWeight={'semibold'}
                        color={'#65FFF1'}
                        marginBottom={'0.5em'}
                      >Nome da Etapa</Text>
                      <Box
                        color={'#FFF'}
                        bgColor={'#58595B'}
                        width={'30em'}
                        height={'5em'}
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
                        marginBottom={'0.5em'}
                      >Objetivo</Text>
                      <Box
                        color={'#FFF'}
                        bgColor={'#58595B'}
                        width={'30em'}
                        height={'15em'}
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
                        marginBottom={'0.5em'}
                      >Prazo</Text>
                      <Box
                        color={'#FFF'}
                        bgColor={'#58595B'}
                        width={'14em'}
                        height={'2em'}
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
                        marginBottom={'0.5em'}
                      >Status</Text>
                      <Box
                        color={'#FFF'}
                        bgColor={'#58595B'}
                        width={'14em'}
                        height={'2em'}
                        borderRadius={'0.5rem'}
                        padding={'0.3rem'}
                        overflow={'hidden'}
                        textAlign={'center'}
                      >{step.priority}</Box>
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
                        width={'14em'}
                        height={'2em'}
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
                      return (<AccordionRequests key={requestForEvidence.id} requestForEvidenceI={requestForEvidence} setRequests={setRequests} process_id={step.process_id} step={step} setStep={setStep} />)
                    })}
                  </Accordion>
                  {
                  role !== null &&
                  (role === 'Gerente' || role === 'Lider' || role === 'Administrador') &&
                  <ModalSolicitaEvidencia requests={requests} setRequests={setRequests} step={step} setStep={setStep} />
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