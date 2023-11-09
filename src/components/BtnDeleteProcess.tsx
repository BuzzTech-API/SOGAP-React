import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, ButtonGroup, FormLabel, Heading, ModalHeader, useDisclosure } from "@chakra-ui/react";
import Process from "../models/Process";
import { ModalGeneric } from "./Modal/Modal";

import { deleteProcess } from "../services/process";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { verifyTokenFetch } from "../services/token";

interface DeleteProcessInterface {
    process: Process,
    processes?: Array<Process>,
    sortProcess?: Array<Process>,
    setSortProcess?: React.Dispatch<React.SetStateAction<Process[]>>
    setProcess?: React.Dispatch<React.SetStateAction<Process[]>>
}

export const BtnDeleteProcess = ({ process, processes = undefined, setProcess = undefined, setSortProcess, sortProcess }: DeleteProcessInterface) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [showSuccessDialog, setShowSuccessDialog] = useState(false)
    const cancelRef = useRef(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        try {
            const response = await deleteProcess(process.id, false)
            if (response) {
                setShowSuccessDialog(true)

            }



        } catch (error) {
            console.log(error)

        } finally {
            if (processes && setProcess) {
                setProcess(processes.filter(item => item.id !== process.id))
            }
            if (sortProcess && setSortProcess) {
                setSortProcess(sortProcess.filter(item => item.id !== process.id))
            }
            onClose()
        }
    }

    return (
        <>
            <Button bg='#ff1a1a' variant='solid'
                textColor='white' colorScheme="#58595B" width={['auto', '8rem']}
                _hover={{ background: '#FFF', color: '#58595B' }}
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
                                <Button ref={cancelRef} onClick={() => setShowSuccessDialog(false)}
                                    _hover={{ background: '#FFF', color: '#58595B' }}
                                >
                                    OK
                                </Button>
                            </Link>) : (<Button ref={cancelRef}
                                _hover={{ background: '#FFF', color: '#58595B' }}
                                onClick={() => {
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

            <ModalGeneric isOpen={isOpen} onClose={onClose} widthModal="40rem" heightModal="auto" >
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
                            Deletar processo
                        </Heading>
                    </ModalHeader>
                    <FormLabel
                        textAlign="center"
                        fontSize="large"
                        color='white'
                    >
                        <strong>Tem certeza de que quer deletar o processo {process.title} ?</strong>

                        <ButtonGroup gap={['5rem', "15rem"]} mt={5}>

                            <Button
                                display="flex"
                                mb={3}
                                bg='#ff1a1a'
                                variant='solid'
                                textColor='white'
                                colorScheme="#58595B"
                                width='100%'
                                _hover={{ background: '#FFF', color: '#58595B' }}
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
                                _hover={{ background: '#FFF', color: '#58595B' }}
                                onClick={onClose}>CANCELAR
                            </Button>
                        </ButtonGroup>
                    </FormLabel>
                </form>
            </ModalGeneric>

        </>
    )
}