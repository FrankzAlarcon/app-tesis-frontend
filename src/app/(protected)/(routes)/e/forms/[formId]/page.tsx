import Image from "next/image"
import ContainerForm from "./steps/container-form"
import { getCareers } from "@/actions/students/get-careers"
import { epnSigners } from "@/constants/epn-signers"

const SelectedFormPage = async () => {
  const careers = await getCareers()
  if (!careers) {
    return null
  }
  return (
    <div className="p-4 lg:py-8 lg:px-12">
      <div className="bg-white w-full rounded-sm shadow-sm p-2">
        <div className="flex justify-between items-center lg:justify-center lg:gap-28">
          <div>
            <Image src="/EPN_logo_big.png" alt='Logo EPN' width={100} height={60} className='md:min-w-24' />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold lg:text-3xl">Escuela Politécnica Nacional</h1>
            <p className="font-semibold lg:text-xl">Facultad de Ingeniería en Sistemas</p>
          </div>
          <div>
            <Image src="/logo-FIS.png" alt='Logo FIS' width={100} height={60} className='md:min-w-24' />
          </div>
        </div>
        <div className="pt-4 md:px-4 md:py-8 lg:p-8">
          <ContainerForm careers={careers} epnSigners={epnSigners} />
        </div>
      </div>
    </div>
  )
}

export default SelectedFormPage