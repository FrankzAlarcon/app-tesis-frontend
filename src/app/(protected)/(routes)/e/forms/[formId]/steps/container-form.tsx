"use client"

import { useState } from "react"
import BusinessDataForm from "./business-data-form"

type Step = 1 | 2 | 3 | 4 | 5 

const ContainerForm = () => {
  const [steps, setSteps] = useState<Step>(1)
  return (
    <div>
      {steps === 1 && <BusinessDataForm />}
    </div>
  )
}

export default ContainerForm