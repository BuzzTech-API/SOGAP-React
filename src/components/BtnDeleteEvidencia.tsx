import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, ButtonGroup, FormLabel, useDisclosure } from "@chakra-ui/react";
import { ModalGeneric } from "./Modal/Modal";

import { SetStateAction, useRef, useState } from "react";
import { deleteEvidence } from "../services/requestEvidence";
import RequestForEvidence from "../models/RequestForEvidence";
import Step from "../models/Steps";
import { verifyTokenFetch } from "../services/token";

interface DeleteEvidencia {
    evidencia: RequestForEvidence
    step: Step,
    setStep: React.Dispatch<SetStateAction<Step>>,
    setRequests: React.Dispatch<SetStateAction<RequestForEvidence[]>>
}

export const BtnDeleteEvidencia = ({ evidencia, step, setStep, setRequests }: DeleteEvidencia) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [showSuccessDialog, setShowSuccessDialog] = useState(false)
    const cancelRef = useRef(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        await verifyTokenFetch()
        try {
            const response = await deleteEvidence(evidencia.id, false)
            if (response) {
                const newRequests = step.requests.filter((item) => item.id !== evidencia.id)
                step.requests = newRequests
                const updatedStep = new Step(
                    step.id, 
                    step.process_id, 
                    step.name, 
                    step.status, 
                    step.order, 
                    step.objective, 
                    step.endingDate, 
                    step.endDate, 
                    step.priority, 
                    step.is_active, 
                    step.users, 
                    step.requests
                    )
                setStep(updatedStep)
                setRequests(updatedStep.requests)
                setShowSuccessDialog(true)
            }



        } catch (error) {
            console.log(error)

        } finally {
            onClose()
        }
    }

    return (
        <>
            <Button
                display="flex"
                variant='solid'
                textColor='white'
                bg={'#58595B'}
                color={'#FFF'}
                width={'100%'}
                _hover={{ background: '#FFF', color: '#58595B' }}
                type="submit"
                onClick={onOpen}
            >Deletar</Button>

            <AlertDialog
                isOpen={showSuccessDialog}
                leastDestructiveRef={cancelRef}
                onClose={() => setShowSuccessDialog(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Evidência apagada com sucesso!
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setShowSuccessDialog(false)}>
                                OK
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <ModalGeneric isOpen={isOpen} onClose={onClose} widthModal="40rem" >
                <form onSubmit={handleSubmit}>
                    <FormLabel
                        textAlign="center"
                        fontSize="large"
                        color='white'
                        mt={3}
                    >
                        <strong>Tem certeza de que quer deletar a evidencia {evidencia.requiredDocument} ?</strong>

                        <ButtonGroup gap="240" mt={5}>
                            <Button
                                display="flex"
                                mb={3}
                                bg='#ff1a1a'
                                variant='solid'
                                textColor='white'
                                colorScheme="#58595B"
                                width='100%'
                                type="submit">DELETAR
                            </Button>

                            <Button
                                display="flex"
                                mb={3}
                                bg='gray'
                                variant='solid'
                                textColor='white'
                                colorScheme="#58595B"
                                width='100%'
                                onClick={onClose}>CANCELAR
                            </Button>
                        </ButtonGroup>
                    </FormLabel>
                </form>
            </ModalGeneric>

        </>
    )
}