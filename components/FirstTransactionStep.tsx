import { Controller, useForm } from 'react-hook-form'
import { classNames } from 'primereact/utils'
import { InputNumber } from 'primereact/inputnumber'
import { Message } from 'primereact/message'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import styles from '../styles/TransactionSteps.module.css'

type FormValues = {
  youSend: number
  recipientReceives: number
  shippingMethod: string
}

export function FirstTransactionStep() {
  const defaultValues: FormValues = {
    youSend: 0,
    recipientReceives: 0,
    shippingMethod: ''
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({ defaultValues })

  /**
   * Destinatario recibe = Tú envías * Tasa de cambio
   * Es un input deshabilitado que solo muestra lo que el destinatario recibe
   */

  return (
    <div>
      <form className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <label
            htmlFor="youSend"
            className={classNames({ 'p-error': !!errors.youSend })}
          >
            Tú envías
          </label>
          <Controller
            name="youSend"
            control={control}
            rules={{
              required: 'Este campo es requerido.'
            }}
            render={({ field }) => (
              <InputNumber
                id={field.name}
                {...field}
                mode="currency"
                inputId="youSend"
                currency="EUR"
                locale="es-ES"
                className={classNames({ 'p-invalid': !!errors.youSend })}
              />
            )}
          />
        </div>
        <div className={styles.inputContainer}>
          <label
            htmlFor="recipientReceives"
            className={classNames({ 'p-error': !!errors.recipientReceives })}
          >
            Destinatario recibe
          </label>
          <Controller
            name="recipientReceives"
            control={control}
            render={({ field }) => (
              <InputNumber
                id={field.name}
                {...field}
                inputId="recipientReceives"
                mode="currency"
                currency="VEF"
                locale="es-ES"
                className={classNames({
                  'p-invalid': !!errors.recipientReceives
                })}
              />
            )}
          />
        </div>
        <div>
          <Message
            severity="info"
            text="Tipo de cambio: 1 EUR = 1.000.000 VEF"
          />
        </div>
        <div className={styles.inputContainer}>
          <label
            htmlFor="shippingMethod"
            className={classNames({ 'p-error': !!errors.shippingMethod })}
          >
            Selecciona un método de envío
          </label>
          <Controller
            name="shippingMethod"
            control={control}
            rules={{
              required: 'Este campo es requerido.'
            }}
            render={({ field }) => (
              <Dropdown
                id={field.name}
                {...field}
                className={classNames({
                  'p-invalid': !!errors.shippingMethod
                })}
                options={[
                  { label: 'Depósito bancario', value: 'bank_deposit' }
                ]}
                placeholder="Método de envío"
              />
            )}
          />
        </div>
        <Button type="submit" label="Continuar" className="p-button-info" />
      </form>
    </div>
  )
}
