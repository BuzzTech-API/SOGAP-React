import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, Icon, Menu, Text, MenuButton, MenuItem, MenuList, VStack, useDisclosure, useToast } from "@chakra-ui/react"
import Evidence from "../../models/Evidence"
import { BtnDeleteEvidencia } from "../BtnDeleteEvidencia"
import { ModalUpdateRequestEvidence } from "../Modal/ModalEditarRequisiçãoEvidencia"
import { ModalInvalidarEvidencia } from "../Modal/ModalInvalidarEvidencia"
import { SetStateAction } from "react"
import { validateEvidence } from "../../services/requestEvidence"
import RequestForEvidence from "../../models/RequestForEvidence"
import { formatDateToBrasil } from "../../services/formatDate"
import { AttachmentIcon } from "@chakra-ui/icons"

interface propsAE {
    role: String
    setIs_validated: React.Dispatch<SetStateAction<boolean>>
    setRequestForEvidence: React.Dispatch<SetStateAction<RequestForEvidence>>
    requestForEvidence: RequestForEvidence
    process_id: number
    step_id: number
    myId: number
    evidences: Evidence[]
    setEvidences: React.Dispatch<SetStateAction<Evidence[]>>
}

export const AccordionEvidence = ({ evidences, role, setIs_validated, setRequestForEvidence, requestForEvidence, process_id, step_id, myId, setEvidences }: propsAE) => {
    const toast = useToast()
    const { isOpen, onClose, onOpen } = useDisclosure()

    const valitadeEvidenceAction = async () => {
        toast.promise(validateEvidence(requestForEvidence.id), {
            success: { title: 'Promise resolved', description: 'Looks great' },
            error: { title: 'Promise rejected', description: 'Something wrong' },
            loading: { title: 'Promise pending', description: 'Please wait' },
        }
        )
        requestForEvidence.is_validated = true
        setIs_validated(requestForEvidence.is_validated)
    }
    const invalitadeEvidenceAction = async () => {
        onOpen()

    }



    return (
        <Accordion allowToggle w={'70%'}>
            {evidences.map(evidence => {
                return (
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left'>

                                    {
                                        evidence.validation.length == 0 &&
                                        (

                                            <Text>Evidência Entregue {formatDateToBrasil(evidence.deliveryDate.toString())}</Text>
                                        )
                                    }
                                    {
                                        evidence.validation.length !== 0 &&
                                        (

                                            <Text>Evidência Entregue {formatDateToBrasil(evidence.deliveryDate.toString())} Invalidada</Text>
                                        )
                                    }
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Flex flexDir={'column'} gap={'0.5rem'}>
                                <Box>
                                    <Text>Link do Documento</Text>
                                    <a href={evidence.link}
                                        target="_blank"
                                        rel="noreferrer">
                                        <Icon as={AttachmentIcon} width={'2rem'} h={'2rem'} />
                                    </a>
                                </Box>

                                {
                                    evidence.validation.length === 0 &&
                                    requestForEvidence.is_validated === false &&
                                    role !== null && (role === 'Administrador' || role === 'Gerente' || role === 'Lider') &&
                                    (
                                        <Menu>
                                            <MenuButton as={Button} bgColor={'#29784E'} color={'#FFF'} variant="solid" size="md">
                                                Ações
                                            </MenuButton>
                                            <MenuList bg={'#58595B'} padding={'1rem'} >
                                                <MenuItem
                                                    as={Button}
                                                    bg={'#58595B'}
                                                    color={'#FFF'}
                                                    width={'100%'}
                                                    _hover={{ background: '#FFF', color: '#58595B' }}
                                                    onClick={valitadeEvidenceAction}
                                                >
                                                    Validar Evidência
                                                </MenuItem>
                                                <MenuItem
                                                    as={Button}
                                                    bg={'#58595B'}
                                                    color={'#FFF'}
                                                    width={'100%'}
                                                    _hover={{ background: '#FFF', color: '#58595B' }}
                                                    onClick={invalitadeEvidenceAction}
                                                >
                                                    Invalidar Evidência
                                                    <ModalInvalidarEvidencia
                                                        evidences={evidences}
                                                        setEvidences={setEvidences}
                                                        process_id={process_id}
                                                        isOpen={isOpen}
                                                        onClose={onClose}
                                                        requestForEvidence={requestForEvidence}
                                                        step_id={step_id}
                                                        myId={myId}
                                                        evidence={evidence}
                                                    />
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    )
                                }
                                {
                                    evidence.validation.length !== 0 &&
                                    (
                                        <VStack>
                                            <Text>Evidência Invalidada</Text>
                                            <Text>{evidence.validation[0].reason}</Text>
                                        </VStack>
                                    )
                                }
                            </Flex>
                        </AccordionPanel>
                    </AccordionItem>
                )

            })}

        </Accordion>
    )

}