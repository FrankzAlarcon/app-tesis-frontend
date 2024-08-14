'use client'
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import getTypesAgreementCompanyChartInfo from "@/actions/business/get-chart-agreement-company";

import { useEffect, useState } from "react";

// Registrar los elementos necesarios para un gráfico de dona
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const AgreementCompanyDoughnutChart = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTypesAgreementCompanyChartInfo()
      .then((chartData) => {
        console.log("chartData", chartData);
        setData(chartData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching chart data: ", error);
        setLoading(false);
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Tipos de instituciones receptoras',
      },
    },
  };

  return (
    <div className="shadow-md rounded-lg w-2/3 p-2 border">
      <p className="mb-2 text-base text-center font-bold">
        Tipos de instituciones receptoras
      </p>
      {loading && <p className="text-center">Cargando...</p>}
      {data && !loading &&
        <Doughnut data={data} options={options} />
      }
    </div>
  );
}

export default AgreementCompanyDoughnutChart;
