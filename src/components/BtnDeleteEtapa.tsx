import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, ButtonGroup, FormLabel, useDisclosure } from "@chakra-ui/react";
import { ModalGeneric } from "./Modal/Modal";
import { verifyTokenFetch } from "../services/token";
import { useRef, useState } from "react";
import Steps from "../models/Steps";
import { deleteStep } from "../services/steps";

interface DeleteEtapaInterface {
    etapa: Steps
}

export const BtnDeleteEtapa = ({etapa}: DeleteEtapaInterface) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [showSuccessDialog, setShowSuccessDialog] = useState(false)
    const cancelRef = useRef(null)
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await verifyTokenFetch()

        try{
            const response = await deleteStep(etapa.id, false)
            if(response){
                setShowSuccessDialog(true)
            }
            
            

        }catch(error){
            console.log(error)

        }finally{
            onClose()
        }
    }

    return(
        <>
        <Button display="flex" mb={3} bg='red' variant='solid' 
            textColor='white' colorScheme="#58595B" width='100%' 
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
                Etapa apagada com sucesso!
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
                        <strong>Tem certeza de que quer deletar a etapa {etapa.name} ?</strong>
                        
                        <ButtonGroup gap="240" mt={5}>
                            <Button 
                                display="flex" 
                                mb={3} 
                                bg='red' 
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