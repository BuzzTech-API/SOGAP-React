import { Avatar, Box, Center, Divider, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import User from "../models/User";

interface ManagerListInterface {
    AllUsers: Array<User>
}

export const ManagerList = ({AllUsers}: ManagerListInterface) => {
    const [managers, setManagers] = useState(new Array<User>());

    useEffect(() => {
        (async () => {
            if (AllUsers) {
                const managers = AllUsers.filter(user =>
                    user.role === "Gerente")
                setManagers(managers)
            }

        })()
    }, [AllUsers])

    return (
        <Stack
            spacing={4}
            align="start"
            bg='linear-gradient(109deg, #58595B 0%, rgba(88, 89, 91, 0.00) 100%)'
            color="white"
            padding="6"
            borderRadius="md"
            maxWidth={'21rem'}
            maxHeight={'30rem'}
            boxShadow="base"
            opacity="0.9"
        >
            <Center width="100%">
                <Text
                    fontFamily={"Poppins"}
                    fontSize={'23px'}
                    fontWeight={'bold'}
                    color={'#08DAF3'}
                    alignItems={'center'}>
                    GERENTES
                </Text>
            </Center>
            <Stack
                spacing={'15px'}
                align={'start'}
                css={{
                    '&::-webkit-scrollbar': {
                        width: '10px',
                        
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '15px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#888',
                        borderRadius: '15px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                    },
                }}
                
                overflowY="scroll"
                width={'21rem'}
            >
            
            {managers.map((manager) => (
                
                <>
                <Box
                    key={manager.id}
                    display="flex"
                    alignItems="center"
                    _hover={{ 
                        bg: "#27B3C3",
                    }}
                    width={'91%'}
                    borderRadius='10px'
                    padding={'8px'}
                    overflowX={'clip'}
                >
                    <Avatar
                        name={manager.name}
                        src={manager.photo_link}
                        size="xs"
                        width={['2.5rem', "3.5rem"]}
                        height={['2.5rem', "3.5rem"]}
                        marginLeft={'1rem'} />
                    <Text 
                    fontFamily="Poppins"
                    fontSize={'20px'}
                    ml={4}
                    
                    >{manager.name}</Text>
                </Box>
                <Divider width={"90%"} />
                </>
            ))}
            </Stack>
        </Stack>
    )
}

export default ManagerList