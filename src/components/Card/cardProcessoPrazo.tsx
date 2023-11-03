import Process from "../../models/Process"
import { Card, Stack, Text } from "@chakra-ui/react";
import { checkDeadline } from "../../services/checkDeadline";
import { formatDateToBrasil } from "../../services/formatDate";


interface processCardInterface {
    process: Process
}


export const CardProcessoPrazo = ({ process }: processCardInterface) => {
    let fontColor: string;
    fontColor = '#ffffff'
    const daysLeft = checkDeadline(process.endingDate);

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
    let bgDayColor: string;
    if (daysLeft > 30) {
        bgDayColor = '#00A3FF';
    } else if (daysLeft > 15) {
        bgDayColor = '#E2CE14';
        //fontColor = '#000000';
    } else {
        bgDayColor = '#FF2323';
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
                    Processo #{process.id}
                </Text>
                <Text
                    //Decrição
                    fontFamily="Poppins"
                    lineHeight="1.43"
                    fontWeight="medium"
                    fontSize="0.9rem"
                    color="#FFFFFF"
                    minHeight="1rem"
                    textAlign="center"
                >
                    {process.title}
                </Text>
                <Text
                    //Prioridade
                    fontFamily="Poppins"
                    lineHeight="1.43"
                    fontWeight="bold"
                    fontSize="0.9rem"
                    color="#FFFFFF"
                    textAlign="center"
                >
                    Prioridade
                </Text>
                <div style={{
                    border: '1px solid #111111',
                    borderRadius: '0.5rem',
                    backgroundColor: bgColor,
                    width: '120%',
                    height: '12%' }}> 
                <Text
                    fontFamily="Poppins"
                    lineHeight="1.43"
                    fontWeight="medium"
                    fontSize="0.9rem"
                    color="#FFFFFF"
                    textAlign="center"
                >
                    {process.priority}
                </Text>
                </div>
                <Text

                    fontFamily="Poppins"
                    lineHeight="1.43"
                    fontWeight="bold"
                    fontSize="0.9rem"
                    color="#FFFFFF"
                    textAlign="center"
                >
                    Prazo
                </Text>
                <Text
                    fontFamily="Poppins"
                    lineHeight="0"
                    fontWeight="medium"
                    fontSize="1rem"
                    color="#FFFFFF"
                    textAlign="center"
                >
                    {formatDateToBrasil(process.endingDate.toString())}
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
                background={bgDayColor}
                margin={0}
                opacity="0.9"
                width={'15.1rem'}
            >
                <Text
                    fontFamily="Poppins"
                    lineHeight="1.5rem"
                    fontWeight="bold"
                    fontSize="18px"
                    color={fontColor}
                    maxHeight='1.5rem'
                    minWidth='14rem'
                    textAlign="center"
                >
                    {daysLeft} Dias Restantes
                </Text>
            </Stack>
        </Stack>
    </Card>

}