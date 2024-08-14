"use server";

import { BACKEND_API_URL } from "@/config/config";
import { currentUser } from "@/lib/auth";
import axios from "axios";

const downloadDashboardReport = async (): Promise<any> => {
  try {
    const user = await currentUser();

    if (!user?.accessToken) {
      return null;
    }
    // Hacer la solicitud para obtener el PDF
    const response = await axios.get(`${BACKEND_API_URL}/charts/download-report`, {
      responseType: 'arraybuffer',
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error downloading report: ", error);
    return null;
  }
};

export default downloadDashboardReport;