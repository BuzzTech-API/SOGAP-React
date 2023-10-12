import { Image, Flex, Center, Text, IconButton, Input } from "@chakra-ui/react"
import { Search2Icon, AddIcon, ChevronRightIcon } from '@chakra-ui/icons'

//import Logo from "../../assets/images/logo-ionichealth-1.png"
import { useEffect, useState } from "react"
import Process from "../../models/Process"
import { ProcessInterface } from "../../interfaces/processInterface"
import User from "../../models/User"
import FormP from "../FormProcess"
import { getAllProcess } from "../../services/process"
import { Link, Navigate} from "react-router-dom"
import { DrawerCadastro } from "../Drawer/Cadastro"

interface sideBarI{
    processes: Array<Process>,
    setProcesses:  React.Dispatch<React.SetStateAction<Process[]>>
}
function SideBar(sideBarI:sideBarI) {
    
    
    

    return (
        <Flex
            flexDirection="column"
            bg="#58595B"
            maxW="380px"
            h="57.7rem"
            gap="30px"
            >

            {/*LOGO */}
            <Link to={"/"}>
            <Center
                mt="80px"
                mb="50px"
                >
                <Image src={"../../assets/images/logo-ionichealth-1.png"} alt="Logo Ionic Health"></Image>
            </Center>
            </Link>


            <Flex
                flexDirection="column" gap={'0.3rem'}>

                {/* CONFIG PROCESSOS */}
                <Flex
                    align="center"
                    pl="20px">
                    <Text color="#53C4CD" fontFamily="Poppins, sans-serif" fontWeight='bold' fontSize="2rem">Processos</Text>
                </Flex>

                {/* PESQUISA E ADD PROCESSO */}
                <Flex
                    pl="20px" >
                    <Input
                        bg="white"
                        placeholder="Pesquise um processo..."
                        borderRightRadius="0"
                        w="250px">
                    </Input>
                    <IconButton
                        aria-label="Btn Pesquisar Processo"
                        borderLeftRadius="0"
                        bg="white"
                        border="0"
                        color="#292A2D"
                        p="0"
                        icon={<Search2Icon />}>
                    </IconButton>
                    <FormP sizeIcon="md" heightIcon={4} widthIcon={4} processes={sideBarI.processes} setProcesses={sideBarI.setProcesses} />

                </Flex>
                <DrawerCadastro />
            </Flex>

            {/* LISTA DE PROCESSOS */}
            <Flex
                flexDirection="column"
                borderRadius="5px"
                p="5px"
                pl="20px"
                cursor="pointer"
                minHeight={'33rem'}
                maxHeight='33rem'
                overflow={'auto'}
                >

                {/* PROCESSO CRIADO */}
                {sideBarI.processes.map( (process:Process) =>{
                    
                    return <Link to={`/process/${process.id}`}><Flex
                    align="center"
                    key={process.id}
                    marginBottom='1rem'
                    flexDirection='row'
                    >
                        <ChevronRightIcon
                            color="white"
                            boxSize="30px">
                        </ChevronRightIcon>
                        <Text
                            color="#53C4CD"
                            fontFamily="Poppins, sans-serif"
                            fontSize="25px">
                            {process.title}
                        </Text>
                    </Flex>
                </Link>
                })}

                
            </Flex>

        </Flex>
    )

}

export default SideBar