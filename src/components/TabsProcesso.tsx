import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Icon, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react"
import Process from "../models/Process"
import User from "../models/User"
import { BtnDeleteProcess } from "./BtnDeleteProcess"
import { ModalUpdateProcess } from "./Modal/ModalEditarProcesso"
import { formatDateToBrasil } from "../services/formatDate"
import { useState } from "react";
interface ProcessTabsI {
    process: Process,
    setProcess: React.Dispatch<React.SetStateAction<Process>>
}
export const ProcessTabs = ({ process, setProcess }: ProcessTabsI) => {
    const [role, setRole] = useState(localStorage.getItem('cargo'))
    let bgColor: string;
    if (process.priority === 'Alta') {
        bgColor = '#FF0000'
    } else if (process.priority === 'Média') {
        bgColor = '#FF7A00'
    } else {
        bgColor = '#00750C'
    }
    return (
        <Tabs height="52.6rem" variant="enclosed" width={['100%','100%', '25rem']} isManual isFitted textColor={'white'} alignSelf="stretch" boxShadow={'4px 0 4px 0 rgba(0,0,0,0.25)'}>
            <TabList width={['100%','25rem']}>
                <Tab>Dados</Tab>
                <Tab>Responsável</Tab>
                {role !== null && (role ==='Gerente'|| role ==='Lider'|| role === 'Administrador') &&
                <Tab>Ações</Tab>}
            </TabList>
            <TabPanels maxWidth={['25rem']} width={['100%', '25rem']} minWidth={['100%','25rem']} >
                <TabPanel width={['100%', '25rem']}>
                    <VStack
                        spacing={'1rem'}
                    >
                        <Stack
                            justify="flex-start"
                            align="center"
                            spacing="0.5rem"
                            height="5rem"
                            alignSelf="stretch"
                            textAlign={'center'}
                        >
                            <Text
                                fontFamily="Poppins"
                                lineHeight="1.43"
                                fontWeight="medium"
                                fontSize="0.9rem"
                                color="#65FFF1"
                                textAlign="center"
                            >
                                Titulo
                            </Text>
                            <Stack
                                paddingX="20px"
                                paddingY="22px"
                                borderRadius="0.3rem"
                                direction="row"
                                justify="flex-start"
                                align="center"
                                spacing="0.3rem"
                                overflow="hidden"
                                width={'20rem'}
                                height={'4rem'}
                                background="#444444"
                            >
                                <Text
                                    fontFamily="Poppins"
                                    lineHeight="1.43"
                                    fontWeight="medium"
                                    fontSize="0.9rem"
                                    color="#65FFF1"
                                    textAlign="center"
                                >
                                    {process.title}
                                </Text>
                            </Stack>
                        </Stack>

                        <Stack
                            justify="flex-start"
                            align="center"
                            spacing="0.5rem"
                            height="12.9rem"
                            alignSelf="stretch"
                        >
                            <Text
                                fontFamily="Poppins"
                                lineHeight="1.43"
                                fontWeight="medium"
                                fontSize="0.9rem"
                                color="#65FFF1"
                                textAlign="center"
                            >
                                Descrição
                            </Text>
                            <Stack
                                padding='0.625rem 0rem'
                                content='center'
                                alignItems='top'
                                gap='0.625rem'
                                paddingY="0.6rem"
                                borderRadius="0.3rem"
                                direction="row"
                                justify="center"
                                align="center"
                                spacing="0.5rem"
                                overflow="hidden"
                                background="#414243"
                                width={'20rem'}
                                height={'12rem'}
                            >
                                <Text
                                    fontFamily="Poppins"
                                    lineHeight="1.43"
                                    fontWeight="medium"
                                    fontSize="0.9rem"
                                    color="#65FFF1"
                                    width="19rem"
                                    maxWidth="100%"
                                    textAlign="center"
                                >
                                    {process.description}
                                </Text>
                            </Stack>
                        </Stack>

                        <Stack
                            justify="flex-start"
                            align="center"
                            spacing="10px"
                            height="9rem"
                            alignSelf="stretch"
                        >
                            <Text
                                fontFamily="Poppins"
                                lineHeight="1.43"
                                fontWeight="medium"
                                fontSize="0.9rem"
                                color="#65FFF1"
                                textAlign="center"
                            >
                                Objetivo
                            </Text>
                            <Stack
                                paddingY="10px"
                                borderRadius="4px"
                                direction="row"
                                justify="center"
                                align="center"
                                spacing="10px"
                                overflow="hidden"
                                width={'20rem'}
                                height={'8rem'}
                                background="#414243"
                            >
                                <Text
                                    fontFamily="Poppins"
                                    lineHeight="1.43"
                                    fontWeight="medium"
                                    fontSize="0.9rem"
                                    color="#65FFF1"
                                    flex="1"
                                    textAlign="center"
                                >
                                    {process.objective}
                                </Text>
                            </Stack>
                        </Stack>

                        <Stack
                            justify="flex-start"
                            align="center"
                            spacing="0.5rem "
                            height="4rem"
                            alignSelf="stretch"
                        >
                            <Text
                                fontFamily="Poppins"
                                lineHeight="1.43"
                                fontWeight="medium"
                                fontSize="0.9rem"
                                color="#65FFF1"
                                textAlign="center"
                            >
                                Status
                            </Text>
                            <Stack
                                paddingX="20px"
                                paddingY="5px"
                                borderRadius="4px"
                                direction="row"
                                justify="flex-start"
                                align="center"
                                spacing="10px"
                                overflow="hidden"
                                width="20rem"
                                height={'3rem'}
                                background="#444444"
                            >
                                <Text
                                    fontFamily="Poppins"
                                    lineHeight="1.43"
                                    fontWeight="medium"
                                    fontSize="0.9rem"
                                    color="#65FFF1"
                                    flex="1"
                                    textAlign="center"
                                >
                                    {process.status}
                                </Text>
                            </Stack>
                        </Stack>

                        <Stack
                            justify="flex-start"
                            align="center"
                            spacing="0.5rem "
                            height="4rem"
                            alignSelf="stretch"
                        >
                            <Text
                                fontFamily="Poppins"
                                lineHeight="1.43"
                                fontWeight="medium"
                                fontSize="0.9rem"
                                color="#65FFF1"
                                textAlign="center"
                            >
                                Data de Criação
                            </Text>
                            <Stack
                                paddingX="20px"
                                paddingY="5px"
                                borderRadius="4px"
                                direction="row"
                                justify="flex-start"
                                align="center"
                                spacing="10px"
                                overflow="hidden"
                                width="20rem"
                                height={'3rem'}
                                background="#444444"
                            >
                                <Text
                                    fontFamily="Poppins"
                                    lineHeight="1.43"
                                    fontWeight="medium"
                                    fontSize="0.9rem"
                                    color="#65FFF1"
                                    flex="1"
                                    textAlign="center"
                                >
                                    {process.createDate === undefined ? <></> : <>{formatDateToBrasil(process.createDate.toString())}</>}
                                </Text>
                            </Stack>
                        </Stack>

                        <Stack
                            justify="flex-start"
                            align="center"
                            spacing="10px"
                            height="73.34px"
                            alignSelf="stretch"
                        >
                            <Text
                                fontFamily="Poppins"
                                lineHeight="1.43"
                                fontWeight="medium"
                                fontSize="0.9rem"
                                color="#65FFF1"
                                textAlign="center"
                            >
                                Prioridade
                            </Text>
                            <Stack
                                paddingX="20px"
                                paddingY="5px"
                                borderRadius="4px"
                                direction="row"
                                justify="flex-start"
                                align="center"
                                spacing="10px"
                                overflow="hidden"
                                width="20rem"
                                height={'3rem'}
                                background={bgColor}
                            >
                                <Text
                                    fontFamily="Poppins"
                                    lineHeight="1.43"
                                    fontWeight="medium"
                                    fontSize="0.9rem"
                                    color="#FFFFFF"
                                    flex="1"
                                    textAlign="center"
                                >
                                    {process.priority}
                                </Text>
                            </Stack>
                        </Stack>
                    </VStack>


                </TabPanel>

                <TabPanel maxWidth={['25rem']} width={['100%', '25rem']} minWidth={['100%','25rem']} minH={'47.6rem'} maxH={'47.6rem'}>
                    <Accordion allowToggle overflowY={'auto'}>
                        {process.users.map((user: User) => {
                            return (<AccordionItem key={user.id}>
                                <AccordionButton height="44px" alignSelf="stretch" >
                                    <Text
                                        fontFamily="Poppins"
                                        lineHeight="1.5"
                                        fontWeight="regular"
                                        fontSize="1rem"
                                        color="#FFFFFF"
                                        flex="1"
                                    >
                                        {user.name}
                                    </Text>
                                </AccordionButton>
                                <AccordionPanel width={['100%','25rem']}>
                                    <Text
                                        fontFamily="Poppins"
                                        lineHeight="1.5"
                                        fontWeight="regular"
                                        fontSize="1rem"
                                        color="#FFFFFF"
                                    >
                                        {user.role}
                                    </Text>
                                    <Text
                                        fontFamily="Poppins"
                                        lineHeight="1.5"
                                        fontWeight="regular"
                                        fontSize="1rem"
                                        color="#FFFFFF"
                                    >
                                        {user.team}
                                    </Text>
                                    <Text
                                        fontFamily="Poppins"
                                        lineHeight="1.5"
                                        fontWeight="regular"
                                        fontSize="1rem"
                                        color="#FFFFFF"
                                        alignSelf="stretch"
                                    >
                                        {user.email}
                                    </Text>
                                </AccordionPanel>
                            </AccordionItem>)
                        })}

                    </Accordion>
                </TabPanel>

                <TabPanel maxWidth={['25rem']} width={['100%', '25rem']}>
                    <Box maxWidth={['25rem']} width={['100%', '25rem']} height={'47.6rem'} padding={0}>
                        <Stack direction="row" justify="center" align="center" spacing="11px" w={'23rem'}>
                            {role !== null && (role ==='Gerente'|| role ==='Lider'|| role === 'Administrador') &&
                            <ModalUpdateProcess process={process} setProcess={setProcess} />}
                            {role !== null && (role ==='Gerente'|| role === 'Administrador') &&
                            <BtnDeleteProcess process={process} />}
                        </Stack>
                    </Box>
                </TabPanel>



            </TabPanels>
        </Tabs>
    )
}

