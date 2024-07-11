'use client'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement, defaults } from 'chart.js';
import getChatInfoActivities from '@/actions/business/get-chat-info-activities-cpp';
import { useEffect, useState } from 'react';
import { title } from 'process';

ChartJS.register(Tooltip, Legend, ArcElement);


// defaults.plugins.legend.position = 'top';

const ActivitiesPieChart = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getChatInfoActivities()
      .then((chartData) => {
        setData(chartData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching chart data: ', error);
        setLoading(false);
      });

  }, []);

  const options = {
    plugins: {
      legend: {
        position: 'left' as 'left',
      },
    },
  };

  return (
    <div className=' shadow-md rounded-lg w-full h-[350px] border p-2 relative overflow-hidden' >
      <p className='mb-2 text-base text-center font-bold'>
        Actividades de Comisión de Prácticas Profesionales
      </p>
      {loading && <p className='text-center'>Cargando...</p>
      }
      {
        data && !loading &&
        <div className='w-full h-[600px] flex justify-center absolute -top-28'>
          <Pie data={data} options={options} />
        </div>
      }
    </div >
  );
}

export default ActivitiesPieChart;

