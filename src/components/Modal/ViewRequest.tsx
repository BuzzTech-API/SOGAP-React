import { Box, Button, useDisclosure, Text, Heading, Center } from "@chakra-ui/react"
import { ModalGeneric } from "./Modal"
import RequestForEvidence from "../../models/RequestForEvidence"
import { ModalUploadEvidence } from "../UploadEvidence"
import { ModalUpdateRequestEvidence } from "./ModalEditarRequisiçãoEvidencia"
import { formatData } from "../../services/formatDate"
import { SetStateAction, useEffect, useState } from "react"
import { verifyTokenFetch } from "../../services/token"
import { getAllUsers } from "../../services/users"
import { BtnDeleteEvidencia } from "../BtnDeleteEvidencia"
import Step from "../../models/Steps"

interface ViewRequestI {
    request: RequestForEvidence,
    setRequestForEvidence: React.Dispatch<React.SetStateAction<RequestForEvidence>>
    step: Step,
    setStep: React.Dispatch<SetStateAction<Step>>,
}

export const ViewRequest: React.FC<ViewRequestI> = ({
    request, step, setRequestForEvidence, setStep
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [responsibleName, setResponsibleName] = useState('')

    useEffect(() => {
        (async () => {
            await verifyTokenFetch()
            const listOfUsers = await getAllUsers()
            if (listOfUsers) {
                const responsibleUser = listOfUsers.find(user =>
                    user.id === request.user_id)
                if (responsibleUser) {
                    setResponsibleName(responsibleUser.name)
                }
            }


        })()
    }, [request])


    return (
        <>
            <Button
                bg={'#58595B'}
                color={'#FFF'}
                _hover={{ background: '#FFF', color: '#58595B' }}
                width={'100%'}
                minHeight={'3rem'}
                padding={'0.1rem'}
                textAlign={'center'}
                fontSize={'1rem'}
                textColor={'white'}
                borderRadius={'0.5rem'}
                onClick={onOpen}
            >
                Adicionar Evidência
            </Button>
            <ModalGeneric
                widthModal="40rem"
                isOpen={isOpen}
                onClose={onClose}
                bgColor="gray"
                header={'Adicionar Evidência'}

                footer={
                    <Button textColor={'white'} bg={'#53C4CD'} onClick={onClose}>
                        Fechar
                    </Button>}
            >
                    <Heading size={'md'} textAlign={'center'}>Documento Requirido</Heading>
                <Center marginBottom={'2rem'}>
                    <Text  display={'flex'} fontSize={'1.3rem'}>{request.requiredDocument}</Text>
                </Center>
                <Box>
                    <ModalUploadEvidence requestForEvidence={request} setRequestForEvidence={setRequestForEvidence} step={step} setStep={setStep}  />
                </Box>
            </ModalGeneric>
        </>
    )
}