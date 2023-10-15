import { useState } from "react"
import Process from "../../models/Process"
import { Card, Stack, Text } from "@chakra-ui/react";
import { checkDeadline } from "../../services/checkDeadline";


interface processCardInterface {
    process: Process
}

function formatDateToBrasil(data: string) {
    // função para pegar a data atual e formatar para "ano/mes/dia"
    const year = data.split('-')[0]
    const month = data.split('-')[1] // getMonth() retorna um valor de 0-11 por isso o +1
    const day = data.split('-')[2]
    const formattedDate = `${day}/${month}/${year}`
    return formattedDate
}

export const CardProcess = (processI: processCardInterface) => {
    const [process] = useState(processI.process)

    const evento = () => {
        console.log('Evento card:' + process.title);
    }
    let bgColor: string;
    if (process.priority === 'Alta') {
        bgColor = '#ff1a1a'
    } else if (process.priority === 'Média') {
        bgColor = '#FF7A00'
    } else {
        bgColor = '#00750C'
    }
    return <Card background="#58595B" onClick={evento} boxShadow="base" opacity="0.9" w={'15.1rem'} h={'18rem'} maxHeight={'17rem'} borderRadius={'0.5rem'}>
        <Stack justify="flex-start" align="center" spacing="23px" opacity={'0.9'}>
            <Stack
                justify="flex-start"
                align="center"
                spacing="8px"
                height="209.56px"
                opacity={'0.9'}
                padding={'1rem'}
            >
                <Text
                    // Título

                    fontFamily="Poppins"
                    lineHeight="1"
                    fontWeight="bold"
                    fontSize="1.2rem"
                    color="#FFFFFF"
                    textAlign="center"
                    paddingBottom='1rem'
                >
                    Processo
                </Text>
                <Text
                    //Decrição
                    fontFamily="Poppins"
                    lineHeight="1.43"
                    fontWeight="medium"
                    fontSize="0.9rem"
                    color="#FFFFFF"
                    minHeight="6rem"
                    textAlign="center"
                >
                    {process.title}
                </Text>
                <Text

                    fontFamily="Poppins"
                    lineHeight="1.43"
                    fontWeight="medium"
                    fontSize="0.9rem"
                    color="#FFFFFF"
                    textAlign="center"
                >
                    Prazo
                </Text>
                <Text
                    fontFamily="Poppins"
                    lineHeight="1.5"
                    fontWeight="bold"
                    fontSize="1rem"
                    color="#FFFFFF"
                    textAlign="center"
                >

                    {formatDateToBrasil(process.endingDate.toLocaleString('pt-BR'))}
                </Text>
            </Stack>
            <Stack
                position="absolute"
                bottom={0}
                paddingX="98px"
                paddingY="5px"
                borderBottomRadius="0.5rem"
                direction="row"
                justify="center"
                align="center"
                spacing="10px"
                overflow="hidden"
                background={bgColor}
                margin={0}
                opacity="0.9"
                width={'15.1rem'}
            >
                <Text
                    fontFamily="Poppins"
                    lineHeight="1.5rem"
                    fontWeight="bold"
                    fontSize="18px"
                    color="#FFFFFF"
                    maxHeight='1.5rem'
                    minWidth='14rem'
                    textAlign="center"
                >
                    {checkDeadline(process.endingDate)} Dias Restantes
                </Text>
            </Stack>
        </Stack>
    </Card>

}