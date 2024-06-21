"use client"

import { useState } from "react"
import FirstStepForm from "./first-step"
import SecondStepForm from "./second-step"
import { Career } from "@/types/careers"
import ThirdStepForm from "./third-step"
import FourthStepForm from "./fourth-step"

export type Step = 1 | 2 | 3 | 4 | 5 

interface ContainerFormProps {
  careers: Career[]
}

const ContainerForm = ({
  careers
}: ContainerFormProps) => {
  const [step, setStep] = useState<Step>(1)
  return (
    <div>
      {step === 1 && <FirstStepForm setStep={setStep} />}
      {step === 2 && <SecondStepForm careers={careers} setStep={setStep} />}
      {step === 3 && <ThirdStepForm setStep={setStep} />}
      {step === 4 && <FourthStepForm setStep={setStep} />}
    </div>
  )
}

export default ContainerForm