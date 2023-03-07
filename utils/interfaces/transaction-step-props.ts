export interface TransactionStepProps {
  nextStep?: () => void
  prevStep?: () => void
  exchangeRate?: number
  setOrderInfo?: () => void
}
