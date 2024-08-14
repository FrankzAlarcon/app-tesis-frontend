"use server"

import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import axios from "axios"

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

const getTypesAgreementCompanyChartInfo = async (): Promise<ChartData | null> => {
  const user = await currentUser()

  if (!user?.accessToken) {
    return null;
  }

  try {
    const response = await axios.get(`${BACKEND_API_URL}/charts/dashboard`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    });

    const data = response.data;

    // Procesa los datos de tipoInstitucionReceptora
    const institutionTypes = data.tipoInstitucionReceptora;

    const labels = Object.values(institutionTypes).map((item: any) => item.type);
    const values = Object.values(institutionTypes).map((item: any) => item.value);

    // Estructura para Chart.js
    const chartData: ChartData = {
      labels: labels,
      datasets: [{
        label: 'Instituciones Receptoras',
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)'
        ],
        borderWidth: 1
      }]
    };

    return chartData;

  } catch (err) {
    console.error(err);
    return null;
  }
}

export default getTypesAgreementCompanyChartInfo;
