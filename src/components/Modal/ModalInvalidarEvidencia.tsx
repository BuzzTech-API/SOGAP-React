import {
    Box,
    Button,
    Flex,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Textarea
} from "@chakra-ui/react"
import React, { SetStateAction, useEffect, useState } from "react";
import { useSocket } from "../../layout/DefaultLayout";
import RequestForEvidence from "../../models/RequestForEvidence";
import Validation from "../../models/Validation";
import Evidence from "../../models/Evidence";
interface PropsInvalidar {
    process_id: number,
    isOpen: boolean,
    onClose: () => void,
    requestForEvidence: RequestForEvidence,
    step_id: number,
    myId: number,
    evidence: Evidence
    evidences: Evidence[]
    setEvidences: React.Dispatch<SetStateAction<Evidence[]>>
}
export const ModalInvalidarEvidencia = ({ process_id, isOpen, onClose, requestForEvidence, step_id, myId, evidence, evidences, setEvidences }: PropsInvalidar) => {

    const [reason, setReason] = useState('')
    const { socket } = useSocket()

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        

        const lastEvidenceIndex = requestForEvidence.evidences.length - 1
        if (socket) {
            if (lastEvidenceIndex >= 0) {
                const data = {
                    event: 'Invalidar evidência',
                    data: {
                        process_id: process_id,
                        step_id: step_id,
                        evidence_id: evidence.id,
                        request_for_evidence_id: requestForEvidence.id,
                        reason: reason,
                        sender: myId
                    }
                }
                socket.send(JSON.stringify(data))
                const validation = new Validation(-1, evidence.id, reason, myId, false)
                setEvidences(evidences.map(evidenceMap => {
                    if (evidenceMap.id === validation.evidence_id) {
                        evidenceMap.validation.push(validation)
                        return evidenceMap
                    }
                    return evidenceMap
                }))
                onClose()
            }
        }

    }
    return (
        <Modal size={['full', 'md']} isOpen={isOpen} onClose={onClose}>
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
                                    onChange={(event) => setReason(event.target.value)}
                                    resize="none"
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