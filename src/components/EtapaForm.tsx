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
import { createUserStep, getAllUsers } from '../services/users';
import Step from '../models/Steps';
import { CloseIcon } from '@chakra-ui/icons';
import { createStep } from '../services/steps';
import { verifyTokenFetch } from '../services/token';
import { StepUser } from '../interfaces/stepInterface';

interface EtapaFormI {
  steps: Array<Step>;
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
  processId: number
  onClose: () => void
}

function EtapaForm({ steps, setSteps, processId, onClose }: EtapaFormI) {
  const [name, setName] = useState('')
  const [objective, setObjective] = useState('')
  const [endingDate, setEndingDate] = useState(new Date())
  const [priority, setPriority] = useState('Alta')
  const [usersList, setUsersList] = useState(new Array<User>())
  const [responsibleList, setResponsibleList] = useState(new Array<User>())


  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Atualizar o estado com o novo valor do input
    setName(event.target.value);
  };
  const handleObjectiveChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Atualizar o estado com o novo valor do input
    setObjective(event.target.value);
  };
  const handleEndingDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Atualizar o estado com o novo valor do input
    let endingDateChange = new Date(event.target.value)
    setEndingDate(endingDateChange);
  };
  const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Atualizar o estado com o novo valor do input
    setPriority(event.target.value);
  };



  //Função para submeter os dados ao servidor BackEnd
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await verifyTokenFetch()
    const newStep = await createStep(name, endingDate, endingDate, processId, objective, priority, steps.length + 1)

    if (newStep !== null) {
      const userStepList = new Array<StepUser>()
      responsibleList.forEach(async (user: User) => {
        await createUserStep(user.id, newStep.id)
        const userStep: StepUser = {
          user_id: user.id,
          step_id: newStep.id,
          user: user
        }
        userStepList.push(userStep)
      })

      newStep.users = userStepList;
      setSteps(steps.concat(newStep))
    }
    //Fetch backEnd
  };
  const setResponsible = (user:User) => {
    setResponsibleList(responsibleList.concat(user))
  }

  const handleChangeResponsible = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const newResponsible = usersList.find(user => user.id===Number.parseInt(e.target.value))
    if(newResponsible){
      setResponsible(newResponsible)
    }

  };
  useEffect(() => {
    (async () => {
      await verifyTokenFetch()
      const listOfUsers = await getAllUsers()
      if (listOfUsers) {
        setUsersList(listOfUsers)
      }

    })();
  }, [])


  return (




    <form onSubmit={handleSubmit}>
      <FormControl id="nomeEtapa" mb={4}>
        <FormLabel className="Subtitulo" color="#ffff">
          Nome da Etapa
        </FormLabel>
        <Input maxLength={64} type="text" background="white" color="#333" onChange={handleNameChange} borderRadius={'2rem'} />
      </FormControl>

      <FormControl id="objetivo" mb={4}>
        <FormLabel className="Subtitulo" color="#ffff">
          Objetivo
        </FormLabel>
        <Textarea maxLength={300} background="white" color="#333" onChange={handleObjectiveChange} borderRadius={'2rem'} />
      </FormControl>

      <FormControl className="Subtitulo" color="#ffff" id="previsaoTermino" mb={4}>
        <FormLabel>Previsão de Término</FormLabel>
        <Input type="date" background="white" color="#333" borderRadius={'2rem'} onChange={handleEndingDateChange} />
      </FormControl>
      <FormControl id="priority" mb={5}>
        <FormLabel color="#ffffff" fontSize="20px" mb={1} ml={210}>Prioridade</FormLabel>
        <Select style={{ width: "100%", height: "40px" }} rounded="100px" color="#000000" bg="#D9D9D9"
          value={priority}
          onChange={handlePriorityChange}>
          <option value="Alta">Alta</option>
          <option value="Média">Média</option>
          <option value="Baixa">Baixa</option>
        </Select>
      </FormControl>
      <FormControl id="responsaveis" color="#ffff" mb={4}>
        <FormLabel className="Subtitulo">Responsáveis</FormLabel>
        <Select style={{ width: "100%", height: "40px" }} rounded="100px" color="#000000" bg="#D9D9D9"
          value={''}
          onChange={handleChangeResponsible}
        >
          <option value=""></option>
          {usersList.map((user: User) => {
            
            return <option key={user.id} value={user.id}>{user.name}</option>
          })}

        </Select>
        <Box>
          <Grid minH={'10rem'} marginLeft='1rem' templateColumns='repeat(2, 1fr)' gap='1.5rem'>
            {responsibleList.map((responsible: User) => {
              const removeResponsible = () => {
                setResponsibleList(responsibleList.filter((item) => item !== responsible))
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
                key={responsible.id}>
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
        marginTop="20px"
        borderRadius='2rem'
        type="submit"
        colorScheme="teal"
        backgroundColor="#53c4cd" // Define a cor de fundo para #53c4cd
        color="#333"
        width="100%" // Faz o botão ocupar todo o espaço lateralmente
        onClick={onClose}
      >
        Enviar
      </Button>
    </form>

  );
}

export default EtapaForm;
