import { Card, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import Step from "../../models/Steps";
import { formatDateToBrasil } from "../../services/formatDate";

interface StepCard {
    step: Step;
    onClick: () => void
}



export const CardStep = (stepI: StepCard) => {
    const [step] = useState(stepI.step)

    let bgColor: string;
    if (step.priority === 'Alta') {
        bgColor = '#FF0000'
    } else if (step.priority === 'Média') {
        bgColor = '#FF7A00'
    } else {
        bgColor = '#00750C'
    }

    return (
        <Card background="#414243" onClick={stepI.onClick} boxShadow="base" opacity="0.9" w={'15.1rem'} h={'17rem'} maxHeight={'17rem'} borderRadius={'0.5rem'}>
            <Stack justify="flex-start" align="center" spacing="23px" opacity={'0.9'}>
                <Stack
                    justify="flex-start"
                    align="center"
                    spacing="34px"
                    height="209.56px"
                    alignSelf="stretch"
                    opacity={'0.9'}
                    padding={'0.3rem'}
                >
                    <Text
                        fontFamily="Poppins"
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="0.9rem"
                        color="#FFFFFF"
                        alignSelf="stretch"
                        textAlign="center"
                    >
                        Etapa {step.order}
                    </Text>
                    <Text
                        fontFamily="Poppins"
                        lineHeight="1.43"
                        fontWeight="bold"
                        fontSize="0.9rem"
                        color="#FFFFFF"
                        height="50px"
                        alignSelf="stretch"
                        textAlign="center"
                    >
                        {step.name}
                    </Text>
                    <Text
                        fontFamily="Poppins"
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="0.9rem"
                        color="#FFFFFF"
                        height="20px"
                        alignSelf="stretch"
                        textAlign="center"
                    >
                        Prazo
                    </Text>
                    <Text
                        fontFamily="Poppins"
                        lineHeight="1.5"
                        fontWeight="bold"
                        fontSize="1rem"
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
                        fontFamily="Inter"
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