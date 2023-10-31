import { Card, Stack, Text, Tooltip } from "@chakra-ui/react";
import { checkDeadline } from "../../services/checkDeadline";
import { formatDateToBrasil } from "../../services/formatDate";
import RequestForEvidence from "../../models/RequestForEvidence";
import { useEffect, useState } from "react";
import { getStepsById } from "../../services/steps";
import { getProcessById } from "../../services/process";


interface requestEvidenceCardInterface {
    requestEvidence: RequestForEvidence
}


export const CardRequestEvidence = ({ requestEvidence }: requestEvidenceCardInterface) => {
    const [ProcessTitle, setProcessTitle] = useState("")
    const [StepTitle, setStepTitle] = useState("")
    const [bgColor, setBgColor] = useState("")

    useEffect(() => {
        (async () => {

            const step = await getStepsById(requestEvidence.step_id)

            if (step) {
                const process = await getProcessById(step.process_id)
                if (process) {
                    setStepTitle(step.name)
                    setProcessTitle(process.title)
                }
            }

            
            const remainingDays = checkDeadline(requestEvidence.evidenceValidationDate)
            if (remainingDays > 15) {
                setBgColor('#0000FF') //Azul
            } else if (remainingDays <= 15 && remainingDays > 5) {
                setBgColor('#FF7A00') //Amarelo
            } else {
                setBgColor('#ff1a1a') //Vermelho
            }
        })()
    }, [requestEvidence])


    const evento = () => {
        console.log('Evento card:' + requestEvidence.requiredDocument);
    }



    return <Card background="#58595B" onClick={evento} boxShadow="base" opacity="0.9" w={'15.1rem'} h={'18rem'} maxHeight={'17rem'} borderRadius={'0.5rem'}>
        <Stack justify="flex-start" align="center" spacing="23px" opacity={'0.9'}>
            <Stack
                justify="flex-start"
                align="center"
                spacing="4px"
                height="237.5px"
                opacity={'0.9'}
                padding={'1rem'}
            >
                <Text
                    // Nome do documento

                    fontFamily="Poppins"
                    lineHeight="1"
                    fontWeight="bold"
                    fontSize="1.2rem"
                    color="#FFFFFF"
                    textAlign="center"
                >
                    Validar Documento
                </Text>
                <Tooltip
                    label={requestEvidence.requiredDocument}
                    placement="top"
                >
                    <Text
                        fontFamily="Poppins"
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="0.9rem"
                        color="#FFFFFF"
                        maxWidth="200px"
                        textAlign="center"
                        paddingBottom={'10px'}
                        isTruncated
                    >
                        {requestEvidence.requiredDocument}
                    </Text>
                </Tooltip>
                <Text
                    // Processo vinculado

                    fontFamily="Poppins"
                    lineHeight="1"
                    fontWeight="bold"
                    fontSize="1.2rem"
                    color="#FFFFFF"
                    textAlign="center"
                >
                    Processo:
                </Text>
                <Tooltip
                    label={ProcessTitle}
                    placement="top"
                >
                    <Text
                        fontFamily="Poppins"
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="0.9rem"
                        color="#FFFFFF"
                        maxWidth="200px"
                        textAlign="center"
                        paddingBottom={"10px"}
                        isTruncated
                    >
                        {ProcessTitle}
                    </Text>
                </Tooltip>
                <Text
                    // Etapa vinculado

                    fontFamily="Poppins"
                    lineHeight="1"
                    fontWeight="bold"
                    fontSize="1.2rem"
                    color="#FFFFFF"
                    textAlign="center"
                >
                    Etapa:
                </Text>
                <Tooltip
                    label={StepTitle}
                    placement="top"
                >
                    <Text
                        fontFamily="Poppins"
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="0.9rem"
                        color="#FFFFFF"
                        maxWidth="200px"
                        textAlign="center"
                        paddingBottom={"10px"}
                        isTruncated
                    >
                        {StepTitle}
                    </Text>
                </Tooltip>

                <Text

                    fontFamily="Poppins"
                    lineHeight="1"
                    fontWeight="bold"
                    fontSize="1.2rem"
                    color="#FFFFFF"
                    textAlign="center"
                >
                    Data de Entrega
                </Text>
                <Text
                    fontFamily="Poppins"
                    lineHeight="1.5"
                    fontWeight="bold"
                    fontSize="1rem"
                    color="#FFFFFF"
                    textAlign="center"
                >

                    {formatDateToBrasil(requestEvidence.evidenceValidationDate.toString())}
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
                    lineHeight="1.5rem"
                    fontWeight="bold"
                    fontSize="18px"
                    color="#FFFFFF"
                    maxHeight='1.5rem'
                    minWidth='14rem'
                    textAlign="center"
                >
                    {checkDeadline(requestEvidence.evidenceValidationDate)} Dias Restantes
                </Text>
            </Stack>
        </Stack>
    </Card>

}