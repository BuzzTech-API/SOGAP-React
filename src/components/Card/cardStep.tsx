import { Box, Center, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { useState } from "react";
import Step from "../../models/Steps";
import { CardBase } from "./cardBase";
import { formatDateToBrasil } from "../../services/formatDate";

interface StepCard{
    step: Step;
    onClick: ()=>void
}



export const CardStep = (stepI:StepCard) => {
    const [step, setStep] = useState(stepI.step)
    
    const evento = stepI.onClick
    let bgColor: string;
    if (step.priority === 'Alta') {
        bgColor='#FF0000'
    }else if (step.priority ==='Média') {
        bgColor='#FF7A00'
    }else{
        bgColor='#00750C'
    }
        return  <CardBase width="18rem" height="21rem" bgColor="#1d1e20" onClickEvent={evento}>
                    <Box flex='1' marginBottom='0rem'>
                        <Box padding='1rem'>
                            <Flex>
                                <Heading textColor='#FFF' size='md' textAlign='center'>Etapa </Heading>
                                <Spacer />
                                <Heading size='md'>{step.order}</Heading>
                            </Flex>
                        </Box>
                        <Box padding='0.5rem 0.1rem'>
                            <Center 
                            fontSize='1.2rem' 
                            textAlign='center' 
                            textColor='#FFF'
                            flexWrap={'wrap'}
                            maxHeight={'3rem'}
                            height={'3rem'}
                            marginBottom={'0.7rem'}
                            alignSelf={'center'}
                            >
                            {step.name}
                            </Center>
                            <Flex 
                            fontSize='1rem' 
                            textAlign='center' 
                            textColor='#FFF'
                            maxHeight={'3rem'}
                            height={'3rem'}
                            flexWrap={'wrap'}
                            ><Text noOfLines={2}>

                            {step.objective}
                            {step.objective}
                            </Text>
                            </Flex>
                        </Box>
                        <Box padding='0.5rem 0.1rem'>
                            <Text fontSize='1.2rem' textAlign='center' textColor='#FFF'>Prazo</Text>
                            <Text fontSize='1.5rem' fontWeight='bold' textAlign='center' textColor='#FFF'>{formatDateToBrasil(step.endingDate.toString())}</Text>
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
                    marginTop='1rem'
                    borderTop='0.2rem solid'
                    borderColor='#FFF'
                    padding='0.6rem'
                    >{step.priority}</Box>
                </CardBase>
}