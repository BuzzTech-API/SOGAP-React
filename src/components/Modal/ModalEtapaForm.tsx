import { Heading, IconButton, ModalHeader, useDisclosure } from "@chakra-ui/react"
import { ModalGeneric } from "./Modal"
import EtapaForm from "../EtapaForm"
import { AddIcon } from "@chakra-ui/icons"
import Step from "../../models/Steps";


interface ModalEtapaFormI {
    widthIcon: string;
    sizeIcon: string;
    heightIcon: string;
    steps: Array<Step>;
    setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
    processId: number
}

export const ModalEtapaForm = ({ widthIcon, sizeIcon, heightIcon, steps, setSteps, processId }: ModalEtapaFormI) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return <>
        <IconButton margin=''
            aria-label="Btn Add Processo"
            bg="#53C4CD"
            color="#FFF"
            borderRadius='24rem'
            padding='1rem'
            size={sizeIcon}
            icon={<AddIcon h={heightIcon} w={widthIcon} />}
            _hover={{ color: "#53C4CD", bg: "#FFF" }}
            onClick={onOpen}
        >

        </IconButton>
        <ModalGeneric
            isOpen={isOpen}
            onClose={onClose}
            widthModal="50rem"
            heightModal="auto"
            header={<ModalHeader textAlign="center"><Heading
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
                Nova etapa
            </Heading></ModalHeader>}>
            <EtapaForm steps={steps} setSteps={setSteps} processId={processId} onClose={onClose} />
        </ModalGeneric>
    </>

}