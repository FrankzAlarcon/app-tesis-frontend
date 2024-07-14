"use server"

import { currentUser } from "@/lib/auth";
import { InputType, ReturnType } from "./type";
import { BACKEND_API_URL } from "@/config/config";
import { createSafeAction } from "@/lib/create-safe-action";
import { getStudentFormSchema } from "./schema";
import axios from "axios";

const action = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser()

  if (!user || !user.accessToken) {
    return {
      error: 'Usuario no autenticado'
    }
  }
  const searchParams = new URLSearchParams()
  const { limit, offset } = data
  if (limit && offset) {
    searchParams.append('limit', limit.toString())
    searchParams.append('offset', offset.toString())
  } else {
    searchParams.append('limit', '10')
    searchParams.append('offset', '0')
  }
  const { filterField, filterValue } = data
  if (filterField && filterValue) {
    searchParams.append('filterField', filterField)
    searchParams.append('filterValue', filterValue)
  }
  const { orderField, orderDirection } = data
  if (orderField && orderDirection) {
    searchParams.append('orderField', orderField)
    searchParams.append('orderDirection', orderDirection)
  }
  try {
    const rta = await axios.get(`${BACKEND_API_URL}/student-form/${data.status}`, {
      params: searchParams,
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    })
    return {
      data: rta.data
    }
  } catch (error) {
    console.log((error as any).data)
    return {
      error: 'Error al obtener los formularios'
    }
  }
}

export const getStudentForms = createSafeAction(getStudentFormSchema, action)