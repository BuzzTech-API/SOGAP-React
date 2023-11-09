import { Button, Flex, Text } from "@chakra-ui/react";
import Process from "../../models/Process";
import { formatDateToBrasil } from "../../services/formatDate";

interface processCardInterface {
    process: Process
}


export default function InformProcesso({ process }: processCardInterface) {

    return (
        <Flex
            w='65rem'
            h='30rem'
            background='linear-gradient(109deg, #58595B 0%, rgba(88, 89, 91, 0.00) 100%)'
            boxShadow='5px 4px 4px 0px rgba(0, 0, 0, 0.50)'
            borderRadius='10px'
            alignItems='center'
            justifyContent='space-evenly'
            direction='column'
        >
            <Text
                color='#54C5CE'
                textAlign='center'
                fontFamily='Poppins, sans-serif'
                fontSize='1.6em'
                fontStyle='normal'
                fontWeight='700'
                lineHeight='normal'>
                INFORMAÇÕES GERAIS
            </Text>


            <Flex
                w='60rem'
                h='20rem'
                background='linear-gradient(279deg, #929292 -63.4%, rgba(146, 146, 146, 0.00) 106.18%)'
                boxShadow='3px 4px 4px 0px rgba(0, 0, 0, 0.25)'
                borderRadius='10px'
                alignItems='center'
                justifyContent='space-evenly'
                direction='column'>
                <Flex
                    direction='column'
                    w='58rem'
                    h='5rem'>
                    <Text
                        color='#54C5CE'
                        fontFamily='Poppins, sans-serif'
                        fontSize='1.4rem'
                        fontStyle='normal'
                        fontWeight='700'
                        lineHeight='normal'>
                        Título
                    </Text>
                    <Text
                        color='#FFF'
                        fontFamily='Poppins, sans-serif'
                        fontSize='1.1rem'
                        fontStyle='normal'
                        fontWeight='400'
                        lineHeight='normal'>
                        {process.title}
                    </Text>
                </Flex>
                <Flex
                    direction='column'
                    w='58rem'
                    h='8rem'>
                    <Text
                        color='#54C5CE'
                        fontFamily='Poppins, sans-serif'
                        fontSize='1.4rem'
                        fontStyle='normal'
                        fontWeight='700'
                        lineHeight='normal'>
                        Objetivo
                    </Text>
                    <Text
                        color='#FFF'
                        fontFamily='Poppins, sans-serif'
                        fontSize='1.1rem'
                        fontStyle='normal'
                        fontWeight='400'
                        lineHeight='normal'>
                        {process.objective}
                    </Text>
                </Flex>
                <Flex
                    w='58rem'
                    h='4rem'>
                    <Flex
                        direction='column'
                        marginRight='7rem'>
                        <Text
                            color='#54C5CE'
                            fontFamily='Poppins, sans-serif'
                            fontSize='1.4rem'
                            fontStyle='normal'
                            fontWeight='700'
                            lineHeight='normal'>
                            Prazo
                        </Text>
                        <Text
                            color='#FFF'
                            fontFamily='Poppins, sans-serif'
                            fontSize='1.1rem'
                            fontStyle='normal'
                            fontWeight='400'
                            lineHeight='normal'>
                            {process.endingDate !== undefined && formatDateToBrasil(process.endingDate.toString())}
                        </Text>
                    </Flex>
                    <Flex 
                    direction='column'>
                        <Text
                            color='#54C5CE'
                            fontFamily='Poppins, sans-serif'
                            fontSize='1.4rem'
                            fontStyle='normal'
                            fontWeight='700'
                            lineHeight='normal'>
                            Ultima Atualização
                        </Text>
                        <Text
                            color='#FFF'
                            fontFamily='Poppins, sans-serif'
                            fontSize='1.1rem'
                            fontStyle='normal'
                            fontWeight='400'
                            lineHeight='normal'>
                            {process.lastUpdate !== undefined && formatDateToBrasil(process.lastUpdate.toString())}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>

            <Button
                w='10rem'
                h='3rem'
                _hover={{ background: '#FFF', color: '#58595B' }}
                background='linear-gradient(270deg, #54C5CE -6.12%, rgba(84, 197, 206, 0.00) 150.36%)'
                borderRadius='10px'>
                <Text
                    color='white'
                    fontFamily='Poppins'
                    fontSize='1.3rem'
                    fontWeight='400'
                    lineHeight='normal'
                    fontStyle='normal'>
                    Exportar
                </Text>
            </Button>
        </Flex>
    )
}