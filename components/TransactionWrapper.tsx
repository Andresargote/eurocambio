import { useEffect, useState } from 'react'
import { Skeleton } from 'primereact/skeleton'

import { FirstTransactionStep } from './FirstTransactionStep'
import { FourthTransactionStep } from './FourthTransactionStep'
import { SecondTransactionStep } from './SecondTransactionStep'
import { StepsComponent } from './StepsComponent'
import { ThirdTransactionStep } from './ThirdTransactionStep'
import { getPairRates } from '../services/admin'
import { Beneficiary, getMyBeneficiaries, OrderForm } from '../services/orders'
import { PairRate } from '../services/pairRates'

export function TransactionWrapper() {
    const [step, setStep] = useState(0)
    const [exchangeRate, setExchangeRate] = useState<PairRate>()
    const [beneficiaries, setBeneficiaries] = useState<Array<Beneficiary>>([])
    const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null)
    const [orderInfo, setOrderInfo] = useState<OrderForm>({
        commission: 1.99,
        payMethod: '',
        purpose: '',
        name: '',
        bankName: '',
        quantity: 0,
        accountId: '',
        documentId: '',
        accountType: '',
        phoneNumber: '',
        paymentReference: ''
    })

    async function getBeneficiaries() {
        const data: Array<Beneficiary> = await getMyBeneficiaries();
        setBeneficiaries(data);
    }

    const setBeneficiaryById = (id: string): void => {
        const beneficiaryData = beneficiaries.find(b => b.id === id)
        if (!beneficiaryData) {
            // error
            return
        }
        setSelectedBeneficiary(beneficiaryData)
    }

    useEffect(() => {
        getPairRates()
            .then((res) => {
                const data = res.find((item: PairRate) => item.name === 'EUR/VES')
                setExchangeRate(data)
                setOrderInfo((prev) => ({
                    ...prev,
                    exchangeRatePrice: data.price
                }))
            })
            .catch((err) => {
                console.log(err)
            })
        getBeneficiaries();
    }, [])

    async function handleGerBeneficiaries() {
        const data = await getMyBeneficiaries()
        setBeneficiaries(data)
    }

    useEffect(() => {
        handleGerBeneficiaries()
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
                        exchangeRate={exchangeRate!}
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
                        beneficiaries={beneficiaries}
                        setBeneficiaryById={setBeneficiaryById}
                    />
                )
            case 2:
                return (
                    <ThirdTransactionStep
                        nextStep={handleNextStep}
                        prevStep={handlePreviousStep}
                        orderInfo={orderInfo}
                        setOrderInfo={setOrderInfo}
                        beneficiaries={beneficiaries}
                        selectedBeneficiary={selectedBeneficiary}
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
                return <Skeleton shape='rectangle' />
        }
    }

    return (
        <>
            <StepsComponent currentStep={step} />
            {handleComponent()}
        </>
    )
}
