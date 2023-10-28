import { Box, Button, Flex, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react";

export const ModalInvalidarEvidencia = () => {
    const [isOpen, setIsOpen] = useState(true)
    const [reason, setReason] = useState('')

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        

    }
    return (
        <Modal size={['full', 'md']} isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <ModalOverlay />
            <ModalContent
                textColor={'white'}
                bg={'#58595B'}
                borderRadius='2rem'
                width={['100%', '40rem']}
                height={['100%', '26rem']}
            >
                <ModalBody>
                    <form onSubmit={submit} method="post">

                        <Flex flexDirection='column' gap={'1rem'}>
                            <Box width={'100%'}>
                                <ModalCloseButton />
                            </Box>
                            <Box
                                flexDirection={'column'}
                                alignItems={'center'}
                                display={'flex'}>
                                <FormLabel>Motivo da Invalidação</FormLabel>
                                <Textarea
                                    maxLength={400}
                                    bg={'white'}
                                    color={'black'}
                                    h={'16rem'}
                                    onChange={(event)=> setReason(event.target.value)}
                                />

                            </Box>
                            <Button
                                type='submit'
                                bg='#53C4CD'
                                variant='solid'
                                textColor='white'>Confirmar Invalidação</Button>
                        </Flex>
                    </form>
                </ModalBody>

            </ModalContent>
        </Modal>
    )
}