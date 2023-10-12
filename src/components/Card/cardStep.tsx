import { Box, Card, Center, Flex, Heading, Spacer, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import Step from "../../models/Steps";
import { CardBase } from "./cardBase";
import { formatDateToBrasil } from "../../services/formatDate";

interface StepCard {
    step: Step;
    onClick: () => void
}



export const CardStep = (stepI: StepCard) => {
    const [step, setStep] = useState(stepI.step)

    const evento = stepI.onClick
    let bgColor: string;
    if (step.priority === 'Alta') {
        bgColor = '#FF0000'
    } else if (step.priority === 'Média') {
        bgColor = '#FF7A00'
    } else {
        bgColor = '#00750C'
    }

    return (
        <Card background="#414243" onClick={stepI.onClick} boxShadow="base" opacity="0.9" w={'242px'} h={'270px'} maxHeight={'270px'}>
            <Stack justify="flex-start" align="center" spacing="23px">
                <Stack
                    justify="flex-start"
                    align="center"
                    spacing="34px"
                    height="209.56px"
                    alignSelf="stretch"
                >
                    <Text
                        fontFamily="Inter"
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="14px"
                        color="#FFFFFF"
                        alignSelf="stretch"
                        textAlign="center"
                    >
                        Etapa {step.order}
                    </Text>
                    <Text
                        fontFamily="Inter"
                        lineHeight="1.43"
                        fontWeight="bold"
                        fontSize="14px"
                        color="#FFFFFF"
                        height="50px"
                        alignSelf="stretch"
                        textAlign="center"
                    >
                        {step.name}
                    </Text>
                    <Text
                        fontFamily="Inter"
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="14px"
                        color="#FFFFFF"
                        height="20px"
                        alignSelf="stretch"
                        textAlign="center"
                    >
                        Prazo
                    </Text>
                    <Text
                        fontFamily="Inter"
                        lineHeight="1.5"
                        fontWeight="bold"
                        fontSize="16px"
                        color="#FFFFFF"
                        height="22px"
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
                    borderBottomRadius="8px"
                    direction="row"
                    justify="center"
                    align="center"
                    spacing="10px"
                    overflow="hidden"
                    background={bgColor}
                    margin={0}
                    opacity="0.9"
                    width={242}
                >
                    <Text
                        fontFamily="Inter"
                        lineHeight="1.5"
                        fontWeight="bold"
                        fontSize="16px"
                        color="#FFFFFF"
                        textAlign="center"
                    >
                        Baixa
                    </Text>
                </Stack>
            </Stack>
        </Card>
    )

}