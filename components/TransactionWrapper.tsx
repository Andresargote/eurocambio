import { FirstTransactionStep } from './FirstTransactionStep'
import { SecondTransactionStep } from './SecondTransactionStep'
import { StepsComponent } from './StepsComponent'

export function TransactionWrapper() {
  return (
    <>
      <StepsComponent />
      <FirstTransactionStep />
      <SecondTransactionStep />
    </>
  )
}
