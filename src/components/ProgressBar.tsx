import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Process from '../models/Process';
import Step from '../models/Steps';
import useBreakpoint from '../hooks/useBreakpoint';
import { getProcessById } from '../services/process';
import { Flex, Text } from '@chakra-ui/react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


interface propsBar {
  process: Process
}

function ProgressBar({ process }: propsBar) {
  const breakpoint = useBreakpoint()
  const [totalEtapas, setTotalEtapas] = useState(0)
  const [filteredStep, setFilteredStep] = useState(new Array<Step>())
  const [options, setOptions] = useState({
    indexAxis: 'y' as const,
    elements: {
      bar: {

      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
    }
    },
    scales: {
      x: { // Configuração para o eixo X (horizontal)
        beginAtZero: true,
        display: true, // Isso oculta os rótulos embaixo das barras
        grid: {
          display: true,
          color: "white"
        },
        ticks:{
          color:'white',
        }
        
      },
      y: { // Configuração para o eixo X (horizontal)
        beginAtZero: true,
        display: true,
        grid: {
          display: true,
          color: "white"
        }
      }

    },

    
  })
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
  
  const data = {
    labels: [''],
    datasets: [
      {
        barPercentage: 1,
        label: 'Etapas Concluídas',
        data: [filteredStep.length, totalEtapas],
        borderColor: 'rgb(255, 255, 255, 1)',
        backgroundColor: 'rgba(84, 197, 206, 0.9)',
      },

    ],
  };


  return <Flex flexDirection={'column'}>
    <Text textColor={'#FFF'}>Etapas Concluídas {filteredStep.length}/{totalEtapas}</Text><Bar options={options} data={data} width={'30%'} height={'5%'} key={process.id} />
  </Flex>
}

export default ProgressBar;