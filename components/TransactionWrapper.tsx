import { FirstTransactionStep } from './FirstTransactionStep'
import { StepsComponent } from './StepsComponent'

export function TransactionWrapper() {
  return (
    <>
      <StepsComponent />
      <FirstTransactionStep />
    </>
  )
}
