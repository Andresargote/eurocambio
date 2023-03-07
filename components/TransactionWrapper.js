import { useEffect, useState } from 'react'
import { FirstTransactionStep } from './FirstTransactionStep'
import { FourthTransactionStep } from './FourthTransactionStep'
import { SecondTransactionStep } from './SecondTransactionStep'
import { StepsComponent } from './StepsComponent'
import { ThirdTransactionStep } from './ThirdTransactionStep'
import { getPairRates } from '../services/admin'

export function TransactionWrapper() {
  const [step, setStep] = useState(0)
  const [exchangeRate, setExchangeRate] = useState({})
  const [orderInfo, setOrderInfo] = useState({
    commission: 1.99
  })

  useEffect(() => {
    getPairRates()
      .then((res) => {
        const data = res.filter((item) => item.name === 'EUR/VES')[0]
        setExchangeRate(data)
        setOrderInfo((prev) => ({
          ...prev,
          exchangeRatePrice: data.price
        }))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handlePreviousStep = () => {
    setStep(step - 1)
  }

  const handleComponent = () => {
    switch (step) {
      case 0:
        return (
          <FirstTransactionStep
            nextStep={handleNextStep}
            exchangeRate={exchangeRate}
            orderInfo={orderInfo}
            setOrderInfo={setOrderInfo}
          />
        )
      case 1:
        return (
          <SecondTransactionStep
            nextStep={handleNextStep}
            prevStep={handlePreviousStep}
            orderInfo={orderInfo}
            setOrderInfo={setOrderInfo}
          />
        )
      case 2:
        return (
          <ThirdTransactionStep
            nextStep={handleNextStep}
            prevStep={handlePreviousStep}
            orderInfo={orderInfo}
            setOrderInfo={setOrderInfo}
          />
        )
      case 3:
        return (
          <FourthTransactionStep
            prevStep={handlePreviousStep}
            orderInfo={orderInfo}
            setOrderInfo={setOrderInfo}
          />
        )
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
