'use client'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement, defaults } from 'chart.js';
import getTypesAgreementChartInfo from '@/actions/business/get-chart-info-covenant';
import { useEffect, useState } from 'react';

// defaults.plugins.legend.position = 'left';

ChartJS.register(Tooltip, Legend, ArcElement);

const AgreementPieChart = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getTypesAgreementChartInfo()
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
      title: {
        text: '',
        display: true,
      },
    },
  };

  return (
    <div className=' shadow-md rounded-lg max-w-80 h-auto border p-2'>
      <p className='mb-2 text-base text-center font-bold'>
        Tipología de convenios de Prácticas Profesionales
      </p>
      {loading && <p className='text-center'>Cargando...</p>}
      {data && !loading && <Pie data={data} options={options} />}
    </div>
  );
};

export default AgreementPieChart;