import { useState } from "react"
import Process from "../../models/Process"
import { CardBase } from "./cardBase"
import { Box, Heading, Text } from "@chakra-ui/react"

interface processCardInterface{
    process:Process
}

function formatDateToBrasil(data:string){
    // função para pegar a data atual e formatar para "ano/mes/dia"
    const year = data.split('-')[0]
    const month = data.split('-')[1] // getMonth() retorna um valor de 0-11 por isso o +1
    const day = data.split('-')[2]
    const formattedDate = `${day}/${month}/${year}`
    return formattedDate
}

export const CardProcess = (processI: processCardInterface) => {
    const [process, setProcess] = useState(processI.process)
    
    const evento = ()=>{console.log('Evento card:'+ process.title);
    }
    let bgColor: string;
    if (process.priority === 'Alta') {
        bgColor='#FF0000'
    }else if (process.priority ==='Média') {
        bgColor='#FF7A00'
    }else{
        bgColor='#00750C'
    }
        return  <CardBase width="20rem" height="23rem" onClickEvent={evento}>
                    <Box flex='1' marginBottom='0rem'>
                        <Box borderBottom='0.2rem solid' borderColor='#FFF' padding='0.4rem'>
                            <Heading textColor='#53C4CD' size='lg' textAlign='center'>Processo #{process.id}</Heading>
                        </Box>
                        <Box padding='0.5rem 0.1rem'>
                            <Text fontSize='1rem' textAlign='center' textColor='#FFF'>Titulo</Text>
                            <Text noOfLines={2} fontSize='1.5rem' textAlign='center' textColor='#53C4CD'>{process.title}</Text>
                        </Box>
                        <Box padding='0.5rem 0.1rem'>
                            <Text fontSize='1rem' textAlign='center' textColor='#FFF'>Última Atualização</Text>
                            <Text fontSize='1.5rem' textAlign='center' textColor='#53C4CD'>{formatDateToBrasil(process.lastUpdate.toLocaleString('pt-BR'))}</Text>
                        </Box>
                        <Box padding='0.5rem 0.1rem'>
                            <Text fontSize='1rem' textAlign='center' textColor='#FFF'>Status</Text>
                            <Text fontSize='1.5rem' textAlign='center' textColor='#53C4CD'>{process.status}</Text>
                        </Box>

                    </Box>
                    <Box 
                    bg={bgColor} 
                    width='20rem' 
                    height='2rem' 
                    borderRadius='0 0 2rem 2rem' 
                    alignSelf='flex-end'
                    textColor='#FFF'
                    fontFamily="Poppins, sans-serif"
                    fontSize="25px"
                    textAlign='center'
                    marginBottom='0'
                    marginTop='1.7rem'
                    borderTop='0.2rem solid'
                    borderColor='#FFF'
                    padding='0.6rem'
                    >{process.priority}</Box>
                </CardBase>
       
}