import { AccordionItem, AccordionButton, AccordionPanel, VStack, Box, Text, Button, Menu, MenuButton, MenuItem, MenuList, useDisclosure, useToast, Accordion, AccordionIcon, Flex } from "@chakra-ui/react";
import RequestForEvidence from "../../models/RequestForEvidence";
import { getUser, getUserById } from "../../services/users";
import User from "../../models/User";
import Process from "../../models/Process";
import { SetStateAction, useEffect, useState } from "react";

import { formatDateToBrasil } from "../../services/formatDate";
import { validateEvidence } from "../../services/requestEvidence";
import { AddEvidence } from "../Modal/AddEvidence";
import { BtnDeleteEvidencia } from "../BtnDeleteEvidencia";
import { ModalUpdateRequestEvidence } from "../Modal/ModalEditarRequisiçãoEvidencia";
import Step from "../../models/Steps";
import { ModalInvalidarEvidencia } from "../Modal/ModalInvalidarEvidencia";
import { verifyTokenFetch } from "../../services/token";
import { AccordionEvidence } from "./AccordionEvidence";

interface AccordionI {
  requestForEvidenceI: RequestForEvidence,
  process_id: number,
  step: Step,
  setStep: React.Dispatch<SetStateAction<Step>>,
  setRequests: React.Dispatch<SetStateAction<RequestForEvidence[]>>
  steps: Step[],
  setSteps: React.Dispatch<SetStateAction<Step[]>>,
}
export const AccordionRequests = ({ requestForEvidenceI, process_id, step, setStep, setRequests, steps, setSteps }: AccordionI) => {
  const [user, setUser] = useState(new User('', '', '', '', false, 0, '', new Array<Process>()))
  const [requestForEvidence, setRequestForEvidence] = useState(requestForEvidenceI)
  const [is_validated, setIs_validated] = useState(requestForEvidence.is_validated)
  const [evidences, setEvidences] = useState(requestForEvidence.evidences)
  const [myId, setMyId] = useState(0)
  const [evidence_is_validated, setEvidence_is_validated] = useState(false)
  const role = localStorage.getItem('cargo')

  useEffect(() => {
    (async () => {
      
      const data: User = await getUserById(requestForEvidence.user_id)
      const me: User = await getUser()
      setMyId(me.id)
      setUser(data)
    })();

  }, [requestForEvidence.user_id])


  useEffect(() => {

    if (evidences.length > 0) {
      const lastEvidence = evidences[evidences.length - 1]
      if (lastEvidence.validation.length !== 0) {
        setEvidence_is_validated(false)
      }
      else {
        setEvidence_is_validated(true)
      }
    }

  }, [evidences])



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
              Prazo
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
          {is_validated === true && evidences.length !== 0 && evidences !== undefined && (<Text
            lineHeight="1.5"
            fontWeight="semibold"
            fontSize="md"
            color="#29784E"
            flex="1"
          >
            Evidência Validada
          </Text>)}
          {evidences !== undefined &&
            role !== null &&
            <AccordionEvidence
              steps={steps}
              setSteps={setSteps}
              evidences={evidences}
              role={role}
              setIs_validated={setIs_validated}
              setRequestForEvidence={setRequestForEvidence}
              requestForEvidence={requestForEvidence}
              setEvidences={setEvidences}
              myId={myId}
              process_id={process_id}
              step_id={step.id}
              key={'Evidence Accordion:' + requestForEvidence.id}
            />
          }


          {is_validated === false &&
            evidences.length !== 0 &&
            evidences !== undefined &&
            evidences[evidences.length - 1].validation !== undefined &&
            evidences[evidences.length - 1].validation.length === 0 &&
            role !== null && role === 'Colaborador' && (<Text
              lineHeight="1.5"
              fontWeight="semibold"
              fontSize="md"
              color="#FF7A00"
              flex="1"
            >
              Evidência ainda não Validada
            </Text>)}

          {evidence_is_validated === false &&
            role !== null && role !== 'Colaborador' &&
            requestForEvidence.user_id === myId &&
            <AddEvidence
              request={requestForEvidence}
              setRequestForEvidence={setRequestForEvidence}
              step={step}
              setStep={setStep}
              evidences={evidences}
              setEvidences={setEvidences}
            />}
          {
            evidence_is_validated === false &&
            role !== null && role === 'Colaborador' &&
            requestForEvidence.user_id === myId &&
            <AddEvidence
              request={requestForEvidence}
              setRequestForEvidence={setRequestForEvidence}
              step={step}
              setStep={setStep}
              evidences={evidences}
              setEvidences={setEvidences}
            />
          }
          <Flex flexDirection={'row'} gap={'1rem'}>
            {
              role !== null && role !== 'Colaborador' &&

              (
                <>
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
                </>
              )

            }
          </Flex>



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
            <Box display={'flex'} flexDirection={'column'} gap={'2rem'}>

              {role !== null && role !== 'Colaborador' && requestForEvidence.user_id === myId &&
                <AddEvidence
                  request={requestForEvidence}
                  setRequestForEvidence={setRequestForEvidence}
                  step={step}
                  setStep={setStep}
                  evidences={evidences}
                  setEvidences={setEvidences}
                />}

              <Box display={'flex'} flexDirection={'row'} gap={'2rem'}>
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
              </Box>
            </Box>
          }
          {role !== null && role === 'Colaborador' && requestForEvidence.user_id === myId &&
            <AddEvidence
              request={requestForEvidence}
              setRequestForEvidence={setRequestForEvidence}
              step={step}
              setStep={setStep}
              evidences={evidences}
              setEvidences={setEvidences}
            />
          }
        </ VStack>
      </AccordionPanel>
    </AccordionItem>
    )
  }
}

