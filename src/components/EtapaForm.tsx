import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Flex,
  IconButton,
  Select,
  Center,
  Grid,
} from '@chakra-ui/react';
import User from '../models/User';
import { getAllUsers } from '../services/users';
import Step from '../models/Steps';
import { CloseIcon } from '@chakra-ui/icons';

interface EtapaForm{
  steps: Array<Step>
}

function EtapaForm() {
  const [name, setName] = useState('')
  const [objective, setObjective] = useState('')
  const [endingDate, setEndingDate] = useState(null)
  const [usersList, setUsersList] = useState(new Array<User>())
  const [responsibleList, setResponsibleList] = useState(new Array<User>())

  useEffect(() => {
    (async () => {
      const listOfUsers = await getAllUsers()
      if (listOfUsers) {
        setUsersList(listOfUsers)
      }
          
        })();
    }, [])


  return (
    

    
    
      <form>
        <FormControl id="nomeEtapa" mb={4}>
          <FormLabel className="Subtitulo" color="#ffff">
            Nome da Etapa
          </FormLabel>
          <Input type="text" background="white" color="#333" />
        </FormControl>

        <FormControl id="objetivo" mb={4}>
          <FormLabel className="Subtitulo" color="#ffff">
            Objetivo
          </FormLabel>
          <Textarea background="white" color="#333" />
        </FormControl>

        <FormControl className="Subtitulo" color="#ffff" id="previsaoTermino" mb={4}>
          <FormLabel>Previsão de Término</FormLabel>
          <Input type="date" background="white" color="#333" />
        </FormControl>

        <FormControl id="responsaveis" color="#ffff" mb={4}>
          <FormLabel className="Subtitulo">Responsáveis</FormLabel>
          <Select  style={{ width: "100%", height: "40px" }} rounded="100px" color="#000000" bg="#D9D9D9"
                            value={''}
                            >
                              <option value=""></option>
                              {usersList.map( (user:User) => {
                                const setResponsible = ()=>{
                                  setResponsibleList(responsibleList.concat(user)) 
                                }
                                return <option onClick={setResponsible} key={user.id} value={user.id}>{user.name}</option>
                              })}
                              
                          </Select>
                          <Box>
                          <Grid marginLeft='1rem' templateColumns='repeat(2, 1fr)' gap='1.5rem'>
                            {responsibleList.map((responsible: User)=>{
                              const removeResponsible = ()=>{
                                setResponsibleList(responsibleList.filter((item)=> item !== responsible))
                              }
                              return <Box 
                              width='15rem' 
                              height='3rem' 
                              bg='#53C4CD' 
                              alignContent='center' 
                              padding='0.5rem 0.5rem 0.5rem 2rem' 
                              borderRadius='2rem'
                              marginTop='0.8rem'
                              marginRight='0.5rem'
                              >
                                {responsible.name}
                                <IconButton marginLeft='2rem'
                                    aria-label="Btn Add Processo"
                                    bg="white"
                                    color="#58595B"
                                    size='sm'
                                    borderRadius='3rem'
                                    icon={<CloseIcon />}
                                    _hover={{ color: "white", bg: "#58595B" }}
                                    onClick={removeResponsible}
                                  />
                              </Box>
                            })}
                          </Grid >
                          </Box>
                            
                      </FormControl>

        <Button
          marginTop= "20px"
          type="submit"
          colorScheme="teal"
          backgroundColor="#53c4cd" // Define a cor de fundo para #53c4cd
          color="#333"
          width="100%" // Faz o botão ocupar todo o espaço lateralmente
        >
          Enviar
        </Button>
      </form>

  );
}

export default EtapaForm;
