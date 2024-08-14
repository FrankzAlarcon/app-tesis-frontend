"use server"

import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import axios from "axios"

const getDashboardChartsData = async (): Promise<any> => {
  const user = await currentUser()

  if (!user?.accessToken) {
    return null
  }

  const info = await axios.get(`${BACKEND_API_URL}/charts/dashboard`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  }).then(response => {
    const data = response.data;

    // Colores personalizados
    const colors = [
      'rgb(78, 121, 167)',
      'rgb(242, 142, 43)',
      'rgb(225, 87, 89)',
      'rgb(118, 183, 178)',
      'rgb(89, 161, 79)'
    ];

    // Procesar datos para tipoInstitucionReceptora
    const tipoInstitucionReceptora = {
      labels: Object.values(data.tipoInstitucionReceptora).map((item: any) => item.type),
      datasets: [{
        label: 'Tipo de Institución Receptora',
        data: Object.values(data.tipoInstitucionReceptora).map((item: any) => item.value),
        backgroundColor: colors.slice(0, Object.keys(data.tipoInstitucionReceptora).length),
      }]
    };

    // Procesar datos para tipoPractica
    const tipoPractica = {
      labels: Object.values(data.tipoPractica).map((item: any) => item.type),
      datasets: [{
        label: 'Tipo de Práctica',
        data: Object.values(data.tipoPractica).map((item: any) => item.value),
        backgroundColor: colors.slice(0, Object.keys(data.tipoPractica).length),
      }]
    };

    // Procesar datos para top5Subjects
    const top5Subjects = {
      labels: Object.values(data.top5Subjects).map((item: any) => item.name),
      datasets: [{
        label: 'Top 5 Asignaturas',
        data: Object.values(data.top5Subjects).map((item: any) => item.value),
        backgroundColor: colors.slice(0, Object.keys(data.top5Subjects).length),
      }]
    };

    return { tipoInstitucionReceptora, tipoPractica, top5Subjects };
  }).catch((err) => {
    console.error(err)
    return null
  });

  return info;
}

export default getDashboardChartsData;
