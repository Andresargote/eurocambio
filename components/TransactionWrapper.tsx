import { useState } from 'react'
import { FirstTransactionStep } from './FirstTransactionStep'
import { FourthTransactionStep } from './FourthTransactionStep'
import { SecondTransactionStep } from './SecondTransactionStep'
import { StepsComponent } from './StepsComponent'
import { ThirdTransactionStep } from './ThirdTransactionStep'

export function TransactionWrapper() {
  const [step, setStep] = useState(0)

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handlePreviousStep = () => {
    setStep(step - 1)
  }

  const handleComponent = () => {
    switch (step) {
      case 0:
        return <FirstTransactionStep nextStep={handleNextStep} />
      case 1:
        return (
          <SecondTransactionStep
            nextStep={handleNextStep}
            prevStep={handlePreviousStep}
          />
        )
      case 2:
        return (
          <ThirdTransactionStep
            nextStep={handleNextStep}
            prevStep={handlePreviousStep}
          />
        )
      case 3:
        return <FourthTransactionStep prevStep={handlePreviousStep} />
      default:
        return <FirstTransactionStep nextStep={handleNextStep} />
    }
  }

  return (
    <>
      <StepsComponent currentStep={step} />
      {handleComponent()}
    </>
  )
}
