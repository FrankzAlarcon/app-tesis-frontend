'use client'
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import getTypesAgreementCompanyChartInfo from "@/actions/business/get-chart-agreement-company";

import { useEffect, useState } from "react";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);


const AgreementCompanyBarChart = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTypesAgreementCompanyChartInfo()
      .then((chartData) => {
        setData(chartData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching chart data: ", error);
        setLoading(false);
      });
  }, []);

  const options = {

  };

  return (
    <div className=" shadow-md rounded-lg w-2/3 p-2 border ">
      <p className="mb-2 text-base text-center font-bold">
        Cantidad de convenios por empresa
      </p>
      {loading && <p className="text-center">Cargando...</p>}
      {data && !loading &&
        <Bar data={data} options={options} />
      }
    </div>
  );
}

export default AgreementCompanyBarChart;


