"use client"

import { useState } from "react"
import FirstStepForm from "./first-step"
import SecondStepForm from "./second-step"

export type Step = 1 | 2 | 3 | 4 | 5 

const ContainerForm = () => {
  const [step, setStep] = useState<Step>(1)
  return (
    <div>
      {step === 1 && <FirstStepForm setStep={setStep} />}
      {step === 2 && <SecondStepForm setStep={setStep} />}
    </div>
  )
}

export default ContainerForm