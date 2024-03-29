import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { classNames } from 'primereact/utils'
import { InputNumber } from 'primereact/inputnumber'
import { Message } from 'primereact/message'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import styles from '../styles/TransactionSteps.module.css'

export function FirstTransactionStep({
  nextStep,
  exchangeRate,
  orderInfo,
  setOrderInfo
}) {
  const [destinataryReceive, setDestinataryReceive] = useState(0)
  const defaultValues = {
    quantity: orderInfo?.quantity || 10,
    shippingMethod: orderInfo?.shippingMethod || ''
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm({ defaultValues })

  /**
   * Destinatario recibe = Tú envías * Tasa de cambio
   * Es un input deshabilitado que solo muestra lo que el destinatario recibe
   */

  useEffect(() => {
    const quantity = watch('quantity')
    setDestinataryReceive(quantity * exchangeRate.price || 0)
  }, [watch('quantity'), exchangeRate])

  const onSubmit = (data, e) => {
    e.preventDefault()
    setOrderInfo((prev) => ({
      ...prev,
      ...data
    }))
    nextStep()
  }

  const getFormErrorMessage = (name) =>
    errors[name] && <small className="p-error">{errors[name]?.message}</small>

  return (
    <div>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <label
            htmlFor="quantity"
            className={classNames({ 'p-error': !!errors.quantity })}
          >
            Tú envías
          </label>
          <Controller
            name="quantity"
            control={control}
            rules={{
              required: 'Este campo es requerido.',
              min: {
                value: 10,
                message: 'El monto mínimo es de 10 EUR.'
              }
            }}
            render={({ field }) => (
              <InputNumber
                id={field.name}
                {...field}
                mode="currency"
                inputId="quantity"
                currency="EUR"
                locale="es-ES"
                onChange={(e) => {
                  field.onChange(e.value)
                }}
                className={classNames({ 'p-invalid': !!errors.quantity })}
              />
            )}
          />
          {getFormErrorMessage('quantity')}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="destinataryReceive">Destinatario recibe</label>
          <InputNumber
            value={destinataryReceive}
            id="destinataryReceive"
            inputId="destinataryReceive"
            mode="currency"
            currency="VEF"
            locale="es-ES"
            disabled
          />
        </div>
        <div>
          <Message
            severity="info"
            text={`Tipo de cambio: 1 EUR = ${
              exchangeRate?.price ? exchangeRate.price : 0
            } VEF`}
          />
        </div>
        <div>
          <Message severity="info" text="Comisión fija de 1.99" />
        </div>
        <div className={styles.inputContainer}>
          <label
            htmlFor="shippingMethod"
            className={classNames({ 'p-error': !!errors.shippingMethod })}
          >
            Pago a tu destinatario vía
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
                  { label: 'Transferencia bancaria', value: 'bank_deposit' }
                ]}
                placeholder="Selecciona el método de envío"
              />
            )}
          />
          {getFormErrorMessage('shippingMethod')}
        </div>
        <Button type="submit" label="Continuar" className="p-button-info" />
      </form>
    </div>
  )
}
