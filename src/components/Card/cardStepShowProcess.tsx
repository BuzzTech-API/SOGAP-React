import { Box, Card, Center, Stack, Text } from "@chakra-ui/react";
import Step from "../../models/Steps";
import { formatDateToBrasil } from "../../services/formatDate";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);


interface StepCard {
    step: Step;
    onClick: () => void
}



export const CardStepShowProcess = ({ step, onClick }: StepCard) => {
    const [validado, setValidado] = useState(0)
    const [naoValidado, setNaoValidado] = useState(0)

    useEffect(() => {
        const total = step.requests.length

        const filteredArray = step.requests.filter(requestForEvidence => requestForEvidence.is_validated === true)
        setNaoValidado(total - filteredArray.length)
        setValidado(filteredArray.length)
    }, [])

    const data = {
        labels: ['Validado', 'Não Validado'],
        datasets: [
            {
                data: [validado, naoValidado], // Adjust the values as needed
                backgroundColor: ['#159900', '#FF0000'],
            },
        ],
    };

    // Options for the chart
    const options = {
        cutout: '70%',
        responsive: true,
        radius: '100%',
        rotation: 270,
        circumference: 180,
        plugins: {
            legend: {
                display: false,
            }
        }
    };

    let bgColor: string;
    let bgColorStatus: string;
    if (step.priority === 'Alta') {
        bgColor = '#FF0000'
    } else if (step.priority === 'Média') {
        bgColor = '#FF7A00'
    } else {
        bgColor = '#159900'
    }
    if (step.status === 'Concluído') {
        bgColorStatus = '#159900'
    } else if (step.status === 'Iniciado') {
        bgColorStatus = '#e2ce14'
    } else {
        bgColorStatus = '#00afff'
    }

    return (
        <Card
            background="#414243"
            onClick={onClick}
            color={'#'}
            boxShadow="base"
            opacity="0.9"
            w={'15rem'}
            maxW={'15rem'}
            h={'22rem'}
            maxHeight={'22rem'}
            borderRadius={'0.5rem'}
            borderTopRadius={'7.5rem'}
        >
            <Box maxW={'15rem'} maxH={'15rem'} alignSelf={'center'} position={'absolute'} top={'-4rem'}>
                <Doughnut data={data} options={options} />
            </Box>
            <Box h={'6.5rem'} width={'100%'} alignContent={'center'} color={'#FFF'} paddingTop={'3rem'}>
                <Text textAlign={'center'}>{validado}/{validado + naoValidado}</Text>
                <Text textAlign={'center'}>Evidências</Text>
            </Box>
            <Stack justify="flex-start" align="center" spacing="0" opacity={'0.9'}>
                <Stack
                    justify="flex-start"
                    align="center"
                    spacing="0.3rem"
                    height="12rem"
                    alignSelf="stretch"
                    opacity={'0.9'}
                    padding={'0.3rem'}
                >
                    <Text
                        fontFamily="Poppins"
                        lineHeight="1.43"
                        fontWeight="bold"
                        fontSize="1.1rem"
                        color="#FFFFFF"
                        alignSelf="stretch"
                        textAlign="center"
                    >
                        Etapa #{step.order}
                    </Text>
                    <Text
                        fontFamily="Poppins"
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="0.9rem"
                        color="#FFFFFF"
                        height="3.5rem"
                        alignSelf="stretch"
                        textAlign="center"
                    >
                        {step.name}
                    </Text>
                    <Text
                        fontFamily="Poppins"
                        lineHeight="1.43"
                        fontWeight="bold"
                        fontSize="0.9rem"
                        color="#FFFFFF"
                        alignSelf="stretch"
                        textAlign="center"
                    >
                        Status
                    </Text>
                    <Box
                        width={'9rem'}
                        h={'1.5rem'}
                        bg={bgColorStatus}
                        border={'solid 0.2rem'}
                        borderRadius={'0.5rem'}
                        alignItems={'center'}
                        padding={'0rem'}
                    >
                        <Text
                            fontFamily="Poppins"
                            lineHeight="1.43"
                            fontWeight="medium"
                            fontSize="0.9rem"
                            color="#FFFFFF"
                            height="100%"
                            verticalAlign={'middle'}
                            textAlign="center"
                        >
                            {step.status}
                        </Text>
                    </Box>

                    <Text
                        fontFamily="Poppins"
                        lineHeight="1.43"
                        fontWeight="bold"
                        fontSize="0.9rem"
                        color="#FFFFFF"
                        height="1rem"
                        alignSelf="stretch"
                        textAlign="center"
                    >
                        Prazo
                    </Text>
                    <Text
                        fontFamily="Poppins"
                        lineHeight="1.5"
                        fontWeight="medium"
                        fontSize="0.9rem"
                        color="#FFFFFF"
                        height="1rem"
                        alignSelf="stretch"
                        textAlign="center"
                    >
                        {formatDateToBrasil(step.endingDate.toString())}
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
                    background={bgColor}
                    margin={0}
                    opacity="0.9"
                    width={'15.1rem'}
                >
                    <Text
                        fontFamily="Poppins"
                        lineHeight="1.5"
                        fontWeight="bold"
                        fontSize="16px"
                        color="#FFFFFF"
                        textAlign="center"
                    >
                        {step.priority}
                    </Text>
                </Stack>
            </Stack>
        </Card>
    )

}