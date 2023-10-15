import { ReactNode, useState } from "react"
import Process from "../../models/Process"
import { Center, Flex, Text, VStack } from "@chakra-ui/react"
import { string } from "yup";

interface processCardInterface {
    process: Process
}

interface Props {
    children: ReactNode;
    comprimento: string,
    altura: string,
    prazo: string,
    nomeProcesso: string,
    tipoProcesso: string,
    corTexto: string,
    bgDiasRestantes?: string
}


//Calcula os dias restantes
function calcularDiasRestantes(process: Process): string {

    let diferencaTempo = Math.abs(process.endingDate.getTime() - process.createDate.getTime());
    let diferencaDia = Math.ceil(diferencaTempo / (1000 * 3600 * 24));

    return diferencaDia.toString();

}

export default function CardProcesso(props: Props, processI: processCardInterface) {

    const [process, setProcess] = useState(processI.process)

    //calcularDiasRestantes(process)


    return (
        <Flex w={props.comprimento} h={props.altura} flexDir='column' bg='#58595B' borderRadius='10px' justifyContent='space-between'>
            <Center marginTop='13px'>
                <Text fontSize='16px' fontWeight="bold" color={props.corTexto}>{props.tipoProcesso}</Text>
            </Center>
            <Center>
                <Text fontSize='14px' color={props.corTexto}>{props.nomeProcesso}</Text>
            </Center>
            <Flex flexDirection="column" justifyContent='center' alignItems='center'>
                <Text fontSize='16px' fontWeight="bold" color={props.corTexto}>Prazo</Text>
                <Text fontSize='14px' marginTop='5px' color={props.corTexto}>{props.prazo}</Text>
            </Flex>
            <Center bg={props.bgDiasRestantes} borderBottomRadius='10px' h='40px'>
                <Text fontSize='16px' fontWeight="bold" color={props.corTexto}>xx Dias Restantes</Text>
            </Center>
        </Flex>
    )
}