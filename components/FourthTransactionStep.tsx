import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { TransactionStepProps } from '../utils/interfaces/transaction-step-props'
import styles from '../styles/TransactionSteps.module.css'

export function FourthTransactionStep({ prevStep }: TransactionStepProps) {
  return (
    <div className={styles.formContainer}>
      <div className={styles.checkbox}>
        <Checkbox inputId="creditCard" />
        <label htmlFor="creditCard">Pagar con tarjeta</label>
      </div>
      <div className={styles.checkbox}>
        <Checkbox inputId="paypal" />
        <label htmlFor="paypal">Pagar con Paypal</label>
      </div>
      <div className={styles.checkbox}>
        <Checkbox inputId="bankTransfer" />
        <label htmlFor="bankTransfer">Pagar con Transferencia bancaria</label>
      </div>

      <div className={styles.formButtons}>
        <Button
          label="Regresar"
          icon="pi pi-arrow-left"
          className="p-button-raised p-button-secondary"
          onClick={(e) => {
            e.preventDefault()
            if (prevStep) prevStep()
          }}
        />
        <Button label="Pagar" className="p-button-success" />
      </div>
    </div>
  )
}
