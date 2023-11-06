import { Box, Button, useDisclosure, Text, Heading, Center } from "@chakra-ui/react"
import { ModalGeneric } from "./Modal"
import RequestForEvidence from "../../models/RequestForEvidence"
import { ModalUploadEvidence } from "../UploadEvidence"
import { SetStateAction } from "react"
import Step from "../../models/Steps"
import Evidence from "../../models/Evidence"

interface AddEvidenceI {
    request: RequestForEvidence,
    setRequestForEvidence: React.Dispatch<React.SetStateAction<RequestForEvidence>>
    step: Step,
    setStep: React.Dispatch<SetStateAction<Step>>,
    evidences: Evidence[]
    setEvidences: React.Dispatch<SetStateAction<Evidence[]>>
}

export const AddEvidence: React.FC<AddEvidenceI> = ({
    request, step, setRequestForEvidence, setStep, evidences, setEvidences
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()


    return (
        <>
            <Button
                bg={'#53C4CD'}
                color={'#FFF'}
                _hover={{ background: '#FFF', color: '#58595B' }}
                width={'12rem'}
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
                    <ModalUploadEvidence 
                    requestForEvidence={request} 
                    onClose={onClose}
                    setRequestForEvidence={setRequestForEvidence} 
                    step={step} 
                    setStep={setStep}  
                    evidences={evidences}
                    setEvidences={setEvidences}
                    />
                </Box>
            </ModalGeneric>
        </>
    )
}