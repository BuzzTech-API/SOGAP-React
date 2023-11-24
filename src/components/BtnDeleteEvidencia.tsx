import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, ButtonGroup, FormLabel, Heading, ModalHeader, useDisclosure } from "@chakra-ui/react";
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
                bg={'#ff1a1a'}
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

            <ModalGeneric isOpen={isOpen} onClose={onClose} widthModal="40rem" heightModal="auto">
                <form onSubmit={handleSubmit}>
                    <ModalHeader textAlign="center">
                        <Heading
                            as="h2"
                            size='lg'
                            fontFamily={'Poppins'}
                            fontSize='1.9rem'
                            fontStyle='normal'
                            fontWeight='bold'
                            mb={3}
                            className="Titulo"
                            color='#53C4CD'
                            textAlign="center">
                            Deletar requisição de evidência
                        </Heading>
                    </ModalHeader>
                    <FormLabel
                        textAlign="center"
                        fontSize="large"
                        color='white'
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
                                bg='#53C4CD'
                                variant='solid'
                                textColor='white'
                                colorScheme="#53C4CD"
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