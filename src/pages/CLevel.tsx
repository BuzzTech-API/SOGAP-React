import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, useBreakpoint } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Process from "../models/Process";
import { TabelaCLevel } from "../components/TabelaCLevel";
import ManagerList from "../components/ManagerList";
import InformProcesso from "../components/InformProcesso/InformProcesso";
import { DonutChart } from "../components/DonutChart";
import { getAllProcess } from "../services/process";
import { getAllUsers } from "../services/users";
import User from "../models/User";
import { verifyTokenFetch } from "../services/token";

export const CLevel = () => {
    const [role, setRole] = useState(localStorage.getItem('cargo'))
    const [processes, setProcesses] = useState(new Array<Process>())
    const [process, setProcess] = useState(new Process())
    const [sortProcess, setSortProcess] = useState(new Array<Process>())
    const [users, setUsers] = useState(new Array<User>())
    const [filteredProcesses, setFilteredProcesses] = useState(new Array<Process>())
    const [displayTabs, setDisplayTabs] = useState('none')
    const [displayBox, setDisplayBox] = useState('flex')
    const [manager, setManager] = useState<User>()
    
    const breakpoint = useBreakpoint()
    useEffect(() => {
        (async () => {
            await verifyTokenFetch()
            const allProcess = await getAllProcess()
            const allUsers = await getAllUsers()
            if (allProcess) {
                setProcesses(allProcess)
                setFilteredProcesses(allProcess)
                setSortProcess(allProcess)
            }
            if (allUsers) {
                setUsers(allUsers)
            }
        })()
    }, [])
    useEffect(() => {
        if (breakpoint === 'xs' || window.innerWidth < 660) {
            setDisplayBox('none')
            setDisplayTabs('box')

        } else {
            setDisplayBox('flex')
            setDisplayTabs('none')
        }

    }, [breakpoint])

    return (
        <Flex flexDir={'column'} gap={'1rem'} paddingTop={'1rem'}>
            <Tabs isFitted variant='enclosed' display={displayTabs} w={'100vw'}>
                <TabList textColor={'white'}>
                    <Tab>Gerentes</Tab>
                    <Tab>Informações Gerais</Tab>
                    <Tab>Status dos Processos</Tab>
                </TabList>

                <TabPanels w={'100vw'}>
                    <TabPanel w={'100vw'} h={'20rem'}>
                        <ManagerList AllUsers={users} />
                    </TabPanel>
                    <TabPanel w={'100vw'}>
                        <InformProcesso process={process} />
                    </TabPanel>
                    <TabPanel w={'100vw'}
                        height={'30rem'}
                        bg={'linear-gradient(109deg, #58595B 0%, rgba(88, 89, 91, 0.00) 100%)'}
                        borderRadius={'0.8rem'}
                        padding={'1rem'}
                    >
                        <DonutChart processes={filteredProcesses} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Flex flexDir={'row'} gap={'1rem'} alignSelf={'center'} display={displayBox} w={'100%'} overflowX={'auto'}>
                <ManagerList AllUsers={users} />
                <InformProcesso process={process} />
                <Box
                    width={'30rem'}
                    height={'30rem'}
                    bg={'linear-gradient(109deg, #58595B 0%, rgba(88, 89, 91, 0.00) 100%)'}
                    borderRadius={'0.8rem'}
                    padding={'1rem'}
                >
                    <DonutChart processes={filteredProcesses} />
                </Box>
            </Flex>
            {role !== null &&

                <TabelaCLevel
                    processes={processes}
                    setProcesses={setProcesses}
                    sortProcess={sortProcess}
                    setSortProcess={setSortProcess}
                    setProcess={setProcess}
                    role={role} />

            }
        </Flex>
    )
}