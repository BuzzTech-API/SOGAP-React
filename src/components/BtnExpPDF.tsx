import { Button } from "@chakra-ui/react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Process from "../models/Process";
import { Content } from "pdfmake/interfaces";
import User from "../models/User";



// Carregando os plugins de fonte para o PDFmake
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

interface PDFProcessInterface {
    process: Process;
    userName?: string;
}
export const BtnExpPDF = ({process, userName }: PDFProcessInterface) => {
    const handleExportPDF = () => {
        
        // Criando o PDF com o conteudo do processo selecionado
        var docDefinition = {
            content: [
                {
                    columns: [
                        {
                            text:  [{text:'\n Gerente: ', fontSize:12, bold:true},` ${userName} \n`,
                                    {text:'Data: ', fontSize:12, bold:true},` ${process.createDate} \n`,
                                    {text:'Prazo: ', fontSize:12, bold:true},` ${process.endingDate} \n`,]
                        }
                    ],
                    //Espaçamento entre colunas
                    columnGap: 200
                },
                {
                    text: '\nRelatório de Processo', fontSize: 24,
                    alignment: 'center'
                },
                {
                    text:  [{text:'\n Nome do processo: ', fontSize:12, bold:true},`\n`,
                            {text:` ${process.title} \n`}]
                },
                {
                    text:  [{text:'\n Descrição: ', fontSize:12, bold:true},`\n`,
                            {text:` ${process.description} \n`}]
                },
                {
                    text:  [{text:'\n Objetivo: ', fontSize:12, bold:true},`\n`,
                            {text:` ${process.objective} \n`}]
                },
                {
                    text:  [{text:'\n Etapas: ', fontSize:12, bold:true},`\n`,
                            {text:'Concluidas: ', fontSize:12},` ${process.title} \n`,
                            {text:'Pendentes: ', fontSize:12},` ${process.title} \n`,
                            {text:'Total: ', fontSize:12},` ${process.title} \n`,]
                },
            ],
            styles: {
                header: {
                    fontSize: 24,
                    bold: true,
                },
                subheader: {
                    fontSize: 15,
                    bold: true
                },
                quote: {
                    italics: true
                },
                small: {
                    fontSize: 8
                }
            }
            
        } as { content: Content; styles?: Record<string, any> };

        // Gerando o PDF
        pdfMake.createPdf(docDefinition).open(); // Abre o PDF no navegador
    };

    return (
        <>
            <Button
                bg='#53C4CD'
                variant='solid'
                textColor='white'
                colorScheme="#58595B"
                width={['auto', '8rem']}
                onClick={handleExportPDF}
            >
                Exportar PDF
            </Button>
        </>
    );
};