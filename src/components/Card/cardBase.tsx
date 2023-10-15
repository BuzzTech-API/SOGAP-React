import { Box, Flex } from "@chakra-ui/react"
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode; // O tipo ReactNode permite que qualquer conteúdo seja passado
  onClickEvent?:()=> void;
  bgColor?: string;
  borderRadius?:string,
  width: string;
  height: string;
  opacity?: string;
  
}

export const CardBase= ({children, onClickEvent, bgColor, width, height, borderRadius = '2rem', opacity='1'}:Props) => {
    if (bgColor) {
        return(
            <Box width={width} bg={bgColor} height={height} minHeight={height} maxHeight={height} borderRadius={borderRadius} opacity={opacity} padding='0' onClick={onClickEvent}>
            <Flex flexDirection='column' height='100%'  padding='0'>
                {children}
            </Flex>
        </Box>
        ) 
    } else {
    }
    return(
        <Box width={width} bg='#58595B' height={height} minHeight={height} maxHeight={height} borderRadius={borderRadius} padding='0' opacity={opacity} onClick={onClickEvent}>
        <Flex flexDirection='column' height='100%'  padding='0'>
            {children}
        </Flex>
    </Box>
    )
    
}