"use server"

import { BACKEND_API_URL } from "@/config/config"
import { currentUser } from "@/lib/auth"
import { BusinessProfile } from "@/types/business"
import axios from "axios"

//simulacion de la peticion
export const getProfile = async (): Promise<BusinessProfile | null> => {
  const user = await currentUser()

  if (!user) return null

  return await axios.get(`${BACKEND_API_URL}/business/profile`,{
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  }).then(res => res.data)
    .catch((err) => console.log('error', err))
  // return {
  //   id: '1',
  //   name: 'Kushki',
  //   code: '123456',
  //   province: 'Pichincha',
  //   city: 'Quito',
  //   phone: '0987654321',
  //   shortDescription: 'Nuestra misión es conectar a latinoamérica con pagos',
  //   description: 'Kushki es la paytech de clase mundial, que conecta a Latam con los pagos digitales y ayuda a las empresas de Latinoamérica a reducir los costos y la complejidad de las transacciones digitales, al mismo tiempo que mejora las tasas de aceptación y reduce los fraudes. Con menos de una década de existencia, Kushki ha sido clasificada dentro de la categoría Unicornio al lograr una valoración de USD $1.5 miles de millones. Kushki opera en 5 países y aprovecha los equipos locales para ofrecer soluciones personalizadas a los clientes de cada país.',
  //   publications: [],
  //   hasCovenant: true,
  // }
}

