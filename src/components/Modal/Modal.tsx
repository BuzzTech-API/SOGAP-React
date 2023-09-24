import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Flex,
    Box,
  } from '@chakra-ui/react'
  import * as React from 'react'
  
  
  interface ModalProps {
    isOpen: boolean,
    onClose: () => void
    children: React.ReactNode,
    header?: React.ReactNode,
    footer?: React.ReactNode,
    widthModal?: string,
    heightModal?: string
    bgColor?: string
    textColor?: string
  }
  
  export const ModalGeneric = ({header, footer, children, isOpen, onClose, widthModal,heightModal,bgColor, textColor}: ModalProps) =>{
    if (bgColor===undefined) {
      bgColor='#58595B'
    }
    if (textColor===undefined) {
      textColor='#FFF'
    }
    return (
      <Modal size={'xxl'} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent textColor={textColor} bg={bgColor} borderRadius='2rem' width={widthModal} height={heightModal}>
            <Flex flexDirection='column'>
            <Box>
              {header ? <ModalHeader>{header}</ModalHeader>: null}
              <ModalCloseButton />
            </Box>
            <Box>
              <ModalBody>{children}</ModalBody>
            </Box>
            <Box>
            {footer ? <ModalFooter>{footer}</ModalFooter>: null}
            </Box>
            </Flex>
          </ModalContent>
        </Modal>
    );
  };