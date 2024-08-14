'use client'
import React from 'react'
import { Activity } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import DashboardCharts from './_components/charts'
import downloadDashboardReport from '@/actions/admin/download-report'
import Loader from '@/components/loader'
import { useToast } from '@/components/ui/use-toast'

const DashboardPage = () => {

  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const arrayBuffer = await downloadDashboardReport();
      if (!arrayBuffer) {
        throw new Error("No se pudo obtener el reporte");
      }
      const base64Data = arrayBufferToBase64(arrayBuffer.data);
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${base64Data}`;
      link.download = `dashboard_report.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: 'Reporte generado',
        description: 'El reporte se ha generado correctamente',
        variant: 'default'
      });
    } catch (error) {
      console.error("Error downloading report: ", error);
      toast({
        title: 'Error al generar reporte',
        description: 'Ha ocurrido un error al generar el reporte',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='w-full h-full flex flex-col gap-6 py-10 px-10 overflow-x-auto'>
      <div className='flex justify-end w-full'>
        <Button className={buttonVariants({ variant: 'default', className: 'sm:w-[192px]' })}
          onClick={handleDownload}
          disabled={isLoading}
        >
          {isLoading
            ?
            <Loader className='text-white h-5 w-5' />
            :
            <>
              <Activity className='w-5 h-5 mr-1' />
              <span>Generar reporte</span>
            </>
          }
        </Button>
      </div>
      <DashboardCharts />
    </section >
  )
}

export default DashboardPage