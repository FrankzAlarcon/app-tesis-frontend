"use server";

import { BACKEND_API_URL } from "@/config/config";
import { currentUser } from "@/lib/auth";
import axios from "axios";

const downloadDashboardReport = async (): Promise<any> => {
  const user = await currentUser();

  if (!user?.accessToken) {
    return null;
  }



}

export default downloadDashboardReport;


