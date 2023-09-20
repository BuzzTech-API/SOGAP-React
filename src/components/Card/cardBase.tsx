import { Box, Flex } from "@chakra-ui/react"
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode; // O tipo ReactNode permite que qualquer conteúdo seja passado
  onClickEvent?:()=> void;
  bgColor?: string;
  width: string;
  height: string;
}

export const CardBase= ({children, onClickEvent, bgColor, width, height}:Props) => {
    if (bgColor) {
        return(
            <Box width={width} bg={bgColor} height={height} borderRadius='2rem' padding='0' onClick={onClickEvent}>
            <Flex flexDirection='column' height='100%'  padding='0'>
                {children}
            </Flex>
        </Box>
        ) 
    } else {
    }
    return(
        <Box width={width} bg='#58595B' height={height} borderRadius='2rem' padding='0' onClick={onClickEvent}>
        <Flex flexDirection='column' height='100%'  padding='0'>
            {children}
        </Flex>
    </Box>
    )
    
}