import Image from "next/image"
import ContainerForm from "./steps/container-form"

const SelectedFormPage = () => {
  
  return (
    <div className="p-4">
      <div className="bg-white w-full rounded-sm shadow-sm p-2">
        <div className="flex justify-between items-center">
          <div>
            <Image src="/EPN_logo_big.png" alt='Logo EPN' width={100} height={60} className='md:min-w-24' />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold">Escuela Politécnica Nacional</h1>
            <p className="font-semibold">Facultad de Ingeniería en Sistemas</p>
          </div>
          <div>
            <Image src="/logo-FIS.png" alt='Logo FIS' width={100} height={60} className='md:min-w-24' />
          </div>
        </div>
        <div className="pt-4 md:px-4 md:py-8">
          <ContainerForm />
        </div>
      </div>
    </div>
  )
}

export default SelectedFormPage