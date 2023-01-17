import { Controller, useForm } from 'react-hook-form'
import { classNames } from 'primereact/utils'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { ClientDetails } from './ClientDetails'
import { TransactionDetails } from './TransactionDetails'
import { TransactionStepProps } from '../utils/interfaces/transaction-step-props'
import styles from '../styles/TransactionSteps.module.css'

type FormValues = {
  purpose: string
  paymentReference: string
}

export function ThirdTransactionStep({
  nextStep,
  prevStep
}: TransactionStepProps) {
  const defaultValues: FormValues = {
    purpose: '',
    paymentReference: ''
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({ defaultValues })

  return (
    <div className={styles.transactionDetailContainer}>
      <TransactionDetails />
      <ClientDetails />

      <form className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <label
            htmlFor="purpose"
            className={classNames({
              'p-error': !!errors.purpose
            })}
          >
            Finalidad de esta remesa
          </label>
          <Controller
            name="purpose"
            control={control}
            rules={{
              required: 'Este campo es requerido.'
            }}
            render={({ field }) => (
              <Dropdown
                id={field.name}
                {...field}
                options={[
                  {
                    label: 'Mantenimiento de familiares',
                    value: 'Mantenimiento de familiares'
                  },
                  {
                    label: 'Pago de servicios',
                    value: 'Pago de servicios'
                  }
                ]}
                className={classNames({
                  'p-invalid': !!errors.purpose
                })}
                placeholder="Selecciona el tipo de finalidad"
              />
            )}
          />
        </div>

        <div className={styles.inputContainer}>
          <label
            htmlFor="paymentReference"
            className={classNames({
              'p-error': !!errors.paymentReference
            })}
          >
            Número de documento del destinatario
          </label>
          <Controller
            name="paymentReference"
            control={control}
            render={({ field }) => <InputText id={field.name} {...field} />}
          />
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
          <Button
            label="Continuar"
            className="p-button-info"
            onClick={(e) => {
              e.preventDefault()
              if (nextStep) nextStep()
            }}
          />
        </div>
      </form>
    </div>
  )
}
