'use client'
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import getDashboardChartsData from "@/actions/admin/get-dashboards-data";
import { useEffect, useState } from "react";
import Loader from '@/components/loader'
// Registrar los elementos necesarios para gráficos de dona y barras
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const DashboardCharts = () => {
  const [chartsData, setChartsData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardChartsData()
      .then((data) => {
        setChartsData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching chart data: ", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      {loading && <Loader />}
      {chartsData && !loading && (
        <div className="w-full grid grid-rows-2 grid-cols-1 gap-4">
          <div className="w-full grid grid-cols-2 justify-between gap-4">
            <div className="w-full h-[380px] border rounded-lg p-2 shadow-md">
              <Doughnut
                data={chartsData.tipoInstitucionReceptora}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'left' as 'left',
                    },
                    title: {
                      display: true,
                      text: 'Tipo de Institución Receptora',
                      font: {
                        size: 16,
                      },
                    },
                  },
                }}
              />
            </div>
            <div className="h-[380px] w-full border rounded-lg p-2 shadow-md ">
              <Doughnut
                data={chartsData.tipoPractica}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'left' as 'left',
                    },
                    title: {
                      display: true,
                      text: 'Tipo de Práctica Profesional',
                      font: {
                        size: 16,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="w-full  h-[350px] border rounded-lg p-2 shadow-md">
            <Bar
              data={chartsData.top5Subjects}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: 'Top 5 Asignaturas más aplicadas en las prácticas profesionales',
                    font: {
                      size: 16,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      )
      }
    </div >
  );
}

export default DashboardCharts;
