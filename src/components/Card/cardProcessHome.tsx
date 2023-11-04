import Process from "../../models/Process"
import { Card, Stack, Text, Box} from "@chakra-ui/react";
import { checkDeadline } from "../../services/checkDeadline";
import { Doughnut } from 'react-chartjs-2';
import { formatDateToBrasil } from "../../services/formatDate";
import Step from "../../models/Steps";
import { useEffect, useState } from "react";
import { getProcessById } from "../../services/process";


interface processCardInterface {
    process: Process;
}


export const CardProcessoPrazo = ({process}: processCardInterface) => {

    const [totalEtapas, setTotalEtapas] = useState(0)
    const [filteredStep, setFilteredStep] = useState(new Array<Step>())

    useEffect(() => {
        (async () => {
          const processFetch = await getProcessById(process.id)
          if (processFetch!==null) {
            setTotalEtapas(processFetch.steps !== undefined ? processFetch.steps.length : 0)
            setFilteredStep(processFetch.steps !== undefined ? processFetch.steps.filter(step => step.status === 'Concluído') : new Array<Step>()) 
            process.steps = processFetch.steps
          }
        })()
    }, [])

    const daysLeft = checkDeadline(process.endingDate);
    let fontColor: string;
    fontColor = '#ffffff'

    const evento = () => {
        console.log('Evento card:' + process.title);
    }

    // Opções de Data para o Grafico
    const data = {
        labels: ['Concluido', 'Não Concluido'],
        datasets: [
            {
                data: [filteredStep.length, totalEtapas - filteredStep.length],
                backgroundColor: ['#159900', '#6E6E6E'],
            },
        ],
    };
  
    // Opções do Grafico semi circulo
    const options = {
        cutout: '70%',
        responsive: true,
        radius: '100%',
        rotation: 260,
        circumference: 200,
        plugins: {
            legend: {
                display: false,
            }
        }
    };
    
    let bgColor: string;
    if (process.priority === 'Alta') {
        bgColor = '#ff1a1a'
    } else if (process.priority === 'Média') {
        bgColor = '#FF7A00'
    } else {
        bgColor = '#00750C'
    }
    let bgDayColor: string;
    if (daysLeft > 30) {
        bgDayColor = '#00A3FF';
    } else if (daysLeft > 15) {
        bgDayColor = '#E2CE14';
    } else {
        bgDayColor = '#FF2323';
    }

    return <Card background="#58595B" onClick={evento} boxShadow="base" opacity="0.9" w={'15.1rem'} h={'22rem'} maxHeight={'22rem'} borderRadius={'0.5rem'}>
        <Stack justify="flex-start" align="center" spacing="23px" opacity={'0.9'}>
            <Stack
                justify="flex-start"
                align="center"
                spacing="10px"
                height="209.56px"
                opacity={'0.9'}
                padding={'0.5rem'}
            >
                <Text
                    // Título
                    fontFamily="Poppins"
                    lineHeight="1"
                    fontWeight="bold"
                    fontSize="1.2rem"
                    color="#FFFFFF"
                    textAlign="center"
                    paddingBottom='0.1rem'
                >
                    Processo #{process.id}
                </Text>
                <Text
                    //Decrição
                    fontFamily="Poppins"
                    lineHeight="1.43"
                    fontWeight="medium"
                    fontSize="0.9rem"
                    color="#FFFFFF"
                    minHeight="1rem"
                    textAlign="center"
                    marginBottom='0.5'
                >
                    {process.title}
                </Text>
                <Box width= '8rem' bg = "#ffffff" borderRadius="6rem">
                    <Box width= '8rem' borderRadius="8rem" marginTop = "-1.7rem" display = "flex">
                        <Doughnut width= '100%' height='100%' data={data} options={options}/>
                    </Box>
                    <Box paddingBottom='2rem' marginTop= '-4.1rem' alignItems='center' display="flex" flexDirection="column" zIndex='4'>
                        <Text
                            fontFamily="Poppins"
                            lineHeight="1.43"
                            fontWeight="Bold"
                            fontSize="0.9rem"
                            color="#000"
                            textAlign="center"
                        >
                        <br />
                            Etapa
                        </Text>
                        <Text
                            fontFamily="Poppins"
                            lineHeight="1.43"
                            fontWeight="medium"
                            fontSize="0.9rem"
                            color="#000"
                            textAlign="center"
                        >
                            {filteredStep.length}/{totalEtapas}
                        </Text>
                    </Box>
                </Box>
                <Text
                    //Prioridade
                    fontFamily="Poppins"
                    lineHeight="1.43"
                    fontWeight="bold"
                    fontSize="0.9rem"
                    color="#FFFFFF"
                    textAlign="center"
                >
                    Prioridade
                </Text>
                <div style={{
                    border: '1px solid #111111',
                    borderRadius: '0.5rem',
                    backgroundColor: bgColor,
                    width: '10rem',
                    height: '12%' }}> 
                <Text
                    fontFamily="Poppins"
                    lineHeight="1.43"
                    fontWeight="medium"
                    fontSize="0.9rem"
                    color="#FFFFFF"
                    textAlign="center"
                >
                    {process.priority}
                </Text>
                </div>
                <Text

                    fontFamily="Poppins"
                    lineHeight="1.43"
                    fontWeight="bold"
                    fontSize="0.9rem"
                    color="#FFFFFF"
                    textAlign="center"
                    paddingBottom='0.1rem'
                >
                    Prazo
                </Text>
                <Text
                    fontFamily="Poppins"
                    lineHeight="0"
                    fontWeight="medium"
                    fontSize="1rem"
                    color="#FFFFFF"
                    textAlign="center"
                >
                    {formatDateToBrasil(process.endingDate.toString())}
                </Text>
            </Stack>
            <Stack
                position="absolute"
                bottom={0}
                paddingX="98px"
                paddingY="5px"
                borderBottomRadius="0.5rem"
                direction="row"
                justify="center"
                align="center"
                spacing="10px"
                overflow="hidden"
                background={bgDayColor}
                margin={0}
                opacity="0.9"
                width={'15.1rem'}
            >
                <Text
                    fontFamily="Poppins"
                    lineHeight="1.5rem"
                    fontWeight="bold"
                    fontSize="18px"
                    color={fontColor}
                    maxHeight='1.5rem'
                    minWidth='14rem'
                    textAlign="center"
                >
                    {daysLeft} Dias Restantes
                </Text>
            </Stack>
        </Stack>
    </Card>
}