import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, ButtonGroup, FormLabel, useDisclosure } from "@chakra-ui/react";
import Process from "../models/Process";
import { ModalGeneric } from "./Modal/Modal";
import { verifyTokenFetch } from "../services/token";
import { deleteProcess } from "../services/process";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

interface DeleteProcessInterface {
    process: Process,
    processes?: Array<Process>,
    setProcess?: React.Dispatch<React.SetStateAction<Process[]>>
}

export const BtnDeleteProcess = ({ process, processes = undefined, setProcess = undefined }: DeleteProcessInterface) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [showSuccessDialog, setShowSuccessDialog] = useState(false)
    const cancelRef = useRef(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await verifyTokenFetch()

        try {
            const response = await deleteProcess(process.id, false)
            if (response) {
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
            <Button bg='#ff1a1a' variant='solid'
                textColor='white' colorScheme="#58595B" width='8rem'
                type="submit" onClick={onOpen}
            >Deletar</Button>

            <AlertDialog
                isOpen={showSuccessDialog}
                leastDestructiveRef={cancelRef}
                onClose={() => setShowSuccessDialog(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Processo apagado com sucesso!
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            {processes === undefined && setProcess === undefined ? (<Link to={'/'}>
                                <Button ref={cancelRef} onClick={() => setShowSuccessDialog(false)}>
                                    OK
                                </Button>
                            </Link>) : (<Button ref={cancelRef} onClick={() => {
                                setShowSuccessDialog(false)
                                if (setProcess !== undefined && processes !== undefined) {
                                    setProcess(processes.filter((item) => item !== process))
                                }
                            }}>
                                OK
                            </Button>)}

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
                        <strong>Tem certeza de que quer deletar o processo {process.title} ?</strong>

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