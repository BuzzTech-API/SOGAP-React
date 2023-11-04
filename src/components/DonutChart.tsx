import React, { useRef, useEffect, useState } from 'react'
import {
    Chart,
    DoughnutController,
    ArcElement,
    CategoryScale,
    ChartConfiguration,
    Legend,
    Title,
    Tooltip
} from 'chart.js'
import Process from '../models/Process'

Chart.register(
    DoughnutController,
    ArcElement,
    CategoryScale,
    Legend,
    Title,
    Tooltip
)

interface DonutChartProps {
    processes: Array<Process>
}

export const DonutChart: React.FC<DonutChartProps> = ({ processes }: DonutChartProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null) //Elemento canvas
    const chartRef = useRef<Chart<'doughnut', number[], string> | null>(null) //Instancia do grafico

    useEffect(() => {
        const statusCounts: Record<string, number> = {}
        let naoIniciado =0
        let iniciado =0
        let concluido = 0
        processes.forEach((process)=>
        {
            if (process.status === 'Concluído') {
                concluido++             
            } else if ( process.status === 'Não iniciado' ) {
                naoIniciado++
            } else if( process.status === 'Iniciado') {
                iniciado++
            }
        }
        ) 
        const order = ["Não iniciado", "Iniciado", "Concluído"]

        const data = {
            labels: order, //Pega o "nome" dos status
            datasets: [
                {
                    label: 'Processos', //Nome do conjunto de dados
                    data: [naoIniciado,iniciado,concluido], //Quantidade de processos para cada status
                    backgroundColor: ['red', 'yellow', 'green'], //Cores correspondentes para cada status
                    borderColor: 'black', //Cor da borda
                    borderWidth: 1.5, //Tamanho da borda
                    hoverOffset: 10 //Efeito do mouse passando por cima
                },

            ],
        }

        if (canvasRef.current) {
            const config: ChartConfiguration<'doughnut', number[], string> = { //Objeto de configuração do grafico
                type: 'doughnut',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: { //Legenda
                            labels: {
                                font: {
                                    size: 14,
                                    style: 'normal',
                                    family: 'Poppins'
                                },
                                color: 'white',
                            },
                            position: 'left',
                        },
                        title: { //Titulo
                            display: false,
                            text: 'Grafico de Processos',
                        },
                        tooltip: { //Caixa de informações quando se passa o mouse por cima
                            callbacks: {
                                label: function (context) {
                                    var label = context.label
                                    var value = context.parsed
                                    return label + ': ' + value
                                }
                            }
                        },
                    },
                },
            }

            chartRef.current = new Chart(canvasRef.current, config) //Cria uma nova instancia do grafico
        }

        return () => {
            chartRef.current?.destroy()
        }
    }, [processes])

    return <canvas ref={canvasRef} />
}