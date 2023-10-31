import { AccordionItem, AccordionButton, AccordionPanel, VStack, Box, Text, Button, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react";
import RequestForEvidence from "../models/RequestForEvidence";
import { getUser, getUserById } from "../services/users";
import User from "../models/User";
import Process from "../models/Process";
import { SetStateAction, useEffect, useState } from "react";

import { formatDateToBrasil } from "../services/formatDate";
import { validateEvidence } from "../services/requestEvidence";
import { ViewRequest } from "./Modal/ViewRequest";
import { BtnDeleteEvidencia } from "./BtnDeleteEvidencia";
import { ModalUpdateRequestEvidence } from "./Modal/ModalEditarRequisiçãoEvidencia";
import Step from "../models/Steps";
import { ModalInvalidarEvidencia } from "./Modal/ModalInvalidarEvidencia";

interface AccordionI {
  requestForEvidenceI: RequestForEvidence,
  process_id: number,
  step: Step,
  setStep: React.Dispatch<SetStateAction<Step>>,
  setRequests: React.Dispatch<SetStateAction<RequestForEvidence[]>>
}
export const AccordionRequests = ({ requestForEvidenceI, process_id, step, setStep, setRequests }: AccordionI) => {
  const [user, setUser] = useState(new User('', '', '', '', false, 0, '', new Array<Process>()))
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [requestForEvidence, setRequestForEvidence] = useState(requestForEvidenceI)
  const [is_validated, setIs_validated] = useState(requestForEvidence.is_validated)
  const [myId, setMyId] = useState(0)
  const role = localStorage.getItem('cargo')
  useEffect(() => {
    (async () => {

      const data: User = await getUserById(requestForEvidence.user_id)
      const me: User = await getUser()
      setMyId(me.id)
      setUser(data)
    })();

  }, [requestForEvidence.user_id])

  const valitadeEvidenceAction = async () => {

    await validateEvidence(requestForEvidence.id)
    requestForEvidence.is_validated = true
    setIs_validated(requestForEvidence.is_validated)
  }
  const invalitadeEvidenceAction = async () => {
    onOpen()

  }



  if (requestForEvidence.evidences.length !== 0 && requestForEvidence.evidences !== undefined) {

    return (<AccordionItem key={requestForEvidence.id}>
      <AccordionButton height="44px" alignSelf="stretch">
        {is_validated ? <Text

          lineHeight="1.5"
          fontWeight="semibold"
          fontSize="md"
          color="#29784E"
          flex="1"
        >
          {requestForEvidence.requiredDocument}
        </Text> : <Text

          lineHeight="1.5"
          fontWeight="semibold"
          fontSize="md"
          color="#FFFFFF"
          flex="1"
        >
          {requestForEvidence.requiredDocument}
        </Text>}
      </AccordionButton>
      <AccordionPanel minWidth={'100%'} textAlign={'center'}>
        <VStack spacing={'1rem'}>
          <Box>

            <Text

              lineHeight="1.5"
              fontWeight="semibold"
              fontSize="md"
              color="#FFFFFF"
            >
              Descrição
            </Text>
            <Text

              lineHeight="1.5"
              fontWeight="regular"
              fontSize="md"
              color="#FFFFFF"
            >
              {requestForEvidence.description}
            </Text>
          </Box>
          <Box>
            <Text

              lineHeight="1.5"
              fontWeight="semibold"
              fontSize="md"
              color="#FFFFFF"
            >
              Data de Entrega
            </Text>
            <Text

              lineHeight="1.5"
              fontWeight="regular"
              fontSize="md"
              color="#FFFFFF"
              alignSelf="stretch"
            >
              {formatDateToBrasil(requestForEvidence.evidences[0].deliveryDate.toString())}
            </Text>
          </Box>
          <Box>
            <Text

              lineHeight="1.5"
              fontWeight="semibold"
              fontSize="md"
              color="#FFFFFF"
            >
              Link do Documento
            </Text>
            <Text

              lineHeight="1.5"
              fontWeight="regular"
              fontSize="md"
              color="#FFFFFF"
              alignSelf="stretch"

            ><a
              href={requestForEvidence.evidences[0].link}
              target="_blank"
              rel="noreferrer"
            >{requestForEvidence.evidences[0].link}</a>

            </Text>
          </Box>
          <Box>
            <Text

              lineHeight="1.5"
              fontWeight="semibold"
              fontSize="md"
              color="#FFFFFF"
            >
              Responsável
            </Text>
            <Text

              lineHeight="1.5"
              fontWeight="regular"
              fontSize="md"
              color="#FFFFFF"
              alignSelf="stretch"
            >
              {user.name}
            </Text>
          </Box>
          {is_validated === true && requestForEvidence.evidences.length !== 0 && requestForEvidence.evidences !== undefined && (<Text
            lineHeight="1.5"
            fontWeight="semibold"
            fontSize="md"
            color="#29784E"
            flex="1"
          >
            Evidência Validada
          </Text>)}
          {is_validated === false &&
            requestForEvidence.evidences.length !== 0 &&
            requestForEvidence.evidences !== undefined &&
            role !== null && (role === 'Administrador' || role === 'Gerente' || role === 'Lider') &&
            (<Menu>
              <MenuButton as={Button} bgColor={'#29784E'} color={'#FFF'} variant="solid" size="md">
                Ações
              </MenuButton>
              <MenuList bg={'#58595B'} padding={'1rem'} >
                <MenuItem
                  as={Button}
                  bg={'#58595B'}
                  color={'#FFF'}
                  width={'100%'}
                  _hover={{ background: '#FFF', color: '#58595B' }}
                  onClick={valitadeEvidenceAction}
                >
                  Validar Evidência
                </MenuItem>
                <MenuItem
                  as={Button}
                  bg={'#58595B'}
                  color={'#FFF'}
                  width={'100%'}
                  _hover={{ background: '#FFF', color: '#58595B' }}
                  onClick={invalitadeEvidenceAction}
                >
                  Invalidar Evidência
                  <ModalInvalidarEvidencia
                    process_id={process_id}
                    isOpen={isOpen}
                    onClose={onClose}
                    requestForEvidence={requestForEvidence}
                    step_id={step.id}
                    myId={myId}
                  />
                </MenuItem>
                <BtnDeleteEvidencia
                  evidencia={requestForEvidence}
                  setRequests={setRequests}
                  setStep={setStep}
                  step={step}
                />

                <ModalUpdateRequestEvidence
                  requestEvidence={requestForEvidence}
                  setRequestForEvidence={setRequestForEvidence}
                  setStep={setStep}
                  step={step}
                />



              </MenuList>
            </Menu>)}
          {is_validated === false &&
            requestForEvidence.evidences.length !== 0 &&
            requestForEvidence.evidences !== undefined &&
            role !== null && role === 'Colaborador' && (<Text
              lineHeight="1.5"
              fontWeight="semibold"
              fontSize="md"
              color="#FF7A00"
              flex="1"
            >
              Evidência ainda não Validada
            </Text>)}



        </VStack>
      </AccordionPanel>
    </AccordionItem>)
  }
  else {
    return (<AccordionItem>
      <AccordionButton height="44px" alignSelf="stretch">
        <Text

          lineHeight="1.5"
          fontWeight="semibold"
          fontSize="md"
          color="#FFFFFF"
          flex="1"
        >
          {requestForEvidence.requiredDocument}
        </Text>
      </AccordionButton>
      <AccordionPanel minWidth={'100%'} textAlign={'center'}>
        <VStack spacing={'1rem'}>
          <Box>

            <Text

              lineHeight="1.5"
              fontWeight="semibold"
              fontSize="md"
              color="#FFFFFF"
            >
              Descrição
            </Text>
            <Text

              lineHeight="1.5"
              fontWeight="regular"
              fontSize="md"
              color="#FFFFFF"
            >
              {requestForEvidence.description}
            </Text>
          </Box>
          <Box>
            <Text

              lineHeight="1.5"
              fontWeight="semibold"
              fontSize="md"
              color="#FFFFFF"
            >
              Prazo de Entrega
            </Text>
            <Text

              lineHeight="1.5"
              fontWeight="regular"
              fontSize="md"
              color="#FFFFFF"
              alignSelf="stretch"
            >
              {formatDateToBrasil(requestForEvidence.deliveryDate.toString())}
            </Text>
          </Box>
          <Text

            lineHeight="1.5"
            fontWeight="semibold"
            fontSize="md"
            color="#FFFFFF"
            alignSelf="stretch"
          >
            Não Entregue
          </Text>
          <Box>
            <Text

              lineHeight="1.5"
              fontWeight="semibold"
              fontSize="md"
              color="#FFFFFF"
            >
              Responsável
            </Text>
            <Text

              lineHeight="1.5"
              fontWeight="regular"
              fontSize="md"
              color="#FFFFFF"
              alignSelf="stretch"
            >
              {user.name}
            </Text>
          </Box>
          {role !== null && role !== 'Colaborador' &&
            <Menu>
              <MenuButton as={Button} bgColor={'#29784E'} color={'#FFF'} variant="solid" size="md">
                Ações
              </MenuButton>
              <MenuList bg={'#58595B'}>
                {role !== null && role !== 'Colaborador' && requestForEvidence.user_id === myId &&
                  <MenuItem bg={'#58595B'}>
                    <ViewRequest request={requestForEvidence} setRequestForEvidence={setRequestForEvidence} step={step} setStep={setStep} />
                  </MenuItem>}
                <MenuItem bg={'#58595B'}>
                  <BtnDeleteEvidencia evidencia={requestForEvidence} setRequests={setRequests} setStep={setStep} step={step} />
                </MenuItem>
                <MenuItem bg={'#58595B'} >
                  <ModalUpdateRequestEvidence requestEvidence={requestForEvidence} setRequestForEvidence={setRequestForEvidence} setStep={setStep} step={step} />
                </MenuItem>
              </MenuList>
            </Menu>
          }
          {role !== null && role === 'Colaborador' && requestForEvidence.user_id === myId &&
            <Menu>
              <MenuButton as={Button} bgColor={'#29784E'} color={'#FFF'} variant="solid" size="md">
                Ações
              </MenuButton>
              <MenuList bg={'#58595B'}>
                <MenuItem bg={'#58595B'}>
                  <ViewRequest request={requestForEvidence} setRequestForEvidence={setRequestForEvidence} step={step} setStep={setStep} />
                </MenuItem>
              </MenuList>
            </Menu>
          }
        </ VStack>
      </AccordionPanel>
    </AccordionItem>
    )
  }
}

