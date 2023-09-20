import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { useState } from "react";
import Step from "../../models/Steps";
import { CardBase } from "./cardBase";

interface StepCard{
    step: Step;
}

function formatDateToBrasil(data:string){
    // função para pegar a data atual e formatar para "ano/mes/dia"
    const year = data.split('-')[0]
    const month = data.split('-')[1] // getMonth() retorna um valor de 0-11 por isso o +1
    const day = data.split('-')[2]
    const formattedDate = `${day}/${month}/${year}`
    return formattedDate
}


export const CardStep = (stepI:StepCard) => {
    const [step, setStep] = useState(stepI.step)
    
    const evento = ()=>{console.log('Evento card:'+ step.objective);
    }
    let bgColor: string;
    if (step.priority === 'Alta') {
        bgColor='#FF0000'
    }else if (step.priority ==='Média') {
        bgColor='#FF7A00'
    }else{
        bgColor='#00750C'
    }
        return  <CardBase width="18rem" height="21rem" bgColor="#1d1e20" onClickEvent={evento}>
                    <Box flex='1' marginBottom='0.5rem'>
                        <Box padding='1rem'>
                            <Flex>
                                <Heading textColor='#FFF' size='md' textAlign='center'>Etapa </Heading>
                                <Spacer />
                                <Heading size='md'>{step.order}</Heading>
                            </Flex>
                        </Box>
                        <Box padding='0.5rem 0.1rem'>
                            <Text 
                            fontSize='1.2rem' 
                            textAlign='center' 
                            textColor='#FFF'
                            >
                            Titulo
                            </Text>
                            <Text 
                            fontSize='1rem' 
                            textAlign='center' 
                            textColor='#FFF'
                            >
                            {step.objective}
                            </Text>
                        </Box>
                        <Box padding='0.5rem 0.1rem'>
                            <Text fontSize='1.2rem' textAlign='center' textColor='#FFF'>Prazo</Text>
                            <Text fontSize='1.5rem' fontWeight='bold' textAlign='center' textColor='#FFF'>{formatDateToBrasil(step.endingDate.toLocaleString('pt-BR'))}</Text>
                        </Box>


                    </Box>
                    <Box 
                    bg={bgColor} 
                    width='18rem' 
                    height='4rem' 
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
                    >{step.priority}</Box>
                </CardBase>
}