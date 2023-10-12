import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Icon, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import Process from "../models/Process"
import User from "../models/User"
import { BtnDeleteEvidence } from "./BtnDeleteEvidence"
import { ModalUpdateProcess } from "./Modal/ModalEditarProcesso"
interface ProcessTabsI{
    process: Process,
    setProcess: React.Dispatch<React.SetStateAction<Process>>
}
export const ProcessTabs = ({process, setProcess}:ProcessTabsI) => {

    return (
        <Tabs height="55.2rem" variant={'soft-rounded'} isFitted textColor={'white'} alignSelf="stretch" boxShadow={'4px 0 4px 0 rgba(0,0,0,0.25)'}>
        <TabList width={'400px'}>
            <Tab textColor={'white'}>Dados</Tab>
            <Tab textColor={'white'}>Responsável</Tab>
            <Tab textColor={'white'}>Ações</Tab>
        </TabList>
        <TabPanels maxWidth={'400px'} minWidth={'400px'} >
            <TabPanel>
                <Stack
                    justify="flex-start"
                    align="center"
                    spacing="10px"
                    height="115.24px"
                    alignSelf="stretch"
                >
                    <Text
                        fontFamily="Inter"
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="14px"
                        color="#65FFF1"
                        textAlign="center"
                    >
                        Titulo
                    </Text>
                    <Stack
                        paddingX="20px"
                        paddingY="22px"
                        borderRadius="4px"
                        direction="row"
                        justify="flex-start"
                        align="center"
                        spacing="10px"
                        overflow="hidden"
                        background="#444444"
                    >
                        <Text
                            fontFamily="Inter"
                            lineHeight="1.43"
                            fontWeight="medium"
                            fontSize="14px"
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
                    spacing="10px"
                    height="231.92px"
                    alignSelf="stretch"
                >
                    <Text
                        fontFamily="Inter"
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="14px"
                        color="#65FFF1"
                        textAlign="center"
                    >
                        Descrição
                    </Text>
                    <Stack
                        paddingY="10px"
                        borderRadius="4px"
                        direction="row"
                        justify="center"
                        align="center"
                        spacing="10px"
                        overflow="hidden"
                        background="#414243"
                    >
                        <Text
                            fontFamily="Inter"
                            lineHeight="1.43"
                            fontWeight="medium"
                            fontSize="14px"
                            color="#65FFF1"
                            width="281px"
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
                    height="188.58px"
                    alignSelf="stretch"
                >
                    <Text
                        fontFamily="Inter"
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="14px"
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
                        width="281px"
                        maxWidth="100%"
                        background="#414243"
                    >
                        <Text
                            fontFamily="Inter"
                            lineHeight="1.43"
                            fontWeight="medium"
                            fontSize="14px"
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
                    spacing="10px"
                    height="73.34px"
                    alignSelf="stretch"
                >
                    <Text
                        fontFamily="Inter"
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="14px"
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
                        width="281px"
                        maxWidth="100%"
                        background="#444444"
                    >
                        <Text
                            fontFamily="Inter"
                            lineHeight="1.43"
                            fontWeight="medium"
                            fontSize="14px"
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
                    spacing="10px"
                    height="73.34px"
                    alignSelf="stretch"
                >
                    <Text
                        fontFamily="Inter"
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="14px"
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
                        width="281px"
                        maxWidth="100%"
                        background="#444444"
                    >
                        <Text
                            fontFamily="Inter"
                            lineHeight="1.43"
                            fontWeight="medium"
                            fontSize="14px"
                            color="#65FFF1"
                            flex="1"
                            textAlign="center"
                        >
                            {process.createDate === undefined ? <></> : <Text>{process.createDate.toString()}</Text>}
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
                        fontFamily="Inter"
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="14px"
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
                        width="281px"
                        maxWidth="100%"
                        background="#FF2828"
                    >
                        <Text
                            fontFamily="Inter"
                            lineHeight="1.43"
                            fontWeight="medium"
                            fontSize="14px"
                            color="#FFFFFF"
                            flex="1"
                            textAlign="center"
                        >
                            {process.priority}
                        </Text>
                    </Stack>
                </Stack>
            </TabPanel>

            <TabPanel maxWidth={'400px'} minWidth={'400px'} minH={'777px'}>
                <Accordion allowToggle>
                    {process.users.map((user: User) => {
                        return (<AccordionItem>
                            <AccordionButton height="44px" alignSelf="stretch">
                                <Text
                                    fontFamily="Inter"
                                    lineHeight="1.5"
                                    fontWeight="regular"
                                    fontSize="16px"
                                    color="#FFFFFF"
                                    flex="1"
                                >
                                    {user.name}
                                </Text>
                            </AccordionButton>
                            <AccordionPanel width={'400px'}>
                                <Text
                                    fontFamily="Inter"
                                    lineHeight="1.5"
                                    fontWeight="regular"
                                    fontSize="16px"
                                    color="#FFFFFF"
                                >
                                    {user.role}
                                </Text>
                                <Text
                                    fontFamily="Inter"
                                    lineHeight="1.5"
                                    fontWeight="regular"
                                    fontSize="16px"
                                    color="#FFFFFF"
                                >
                                    {user.team}
                                </Text>
                                <Text
                                    fontFamily="Inter"
                                    lineHeight="1.5"
                                    fontWeight="regular"
                                    fontSize="16px"
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

            <TabPanel maxWidth={'400px'}>
                <Box maxWidth={'400px'} height={'777px'} padding={0}>
                    <Stack direction="row" justify="center" align="flex-start" spacing="11px" w={'292px'}>
                        <ModalUpdateProcess />
                        <BtnDeleteEvidence process={process} />
                    </Stack>
                </Box>
            </TabPanel>



        </TabPanels>
    </Tabs>
    )
}

