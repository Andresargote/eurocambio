import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { classNames } from 'primereact/utils'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { ClientDetails } from './ClientDetails'
import { TransactionDetails } from './TransactionDetails'
import styles from '../styles/TransactionSteps.module.css'
import { Beneficiary, OrderForm } from '../services/orders'

interface Props {
    nextStep: () => void;
    prevStep: () => void;
    orderInfo: OrderForm;
    setOrderInfo: Dispatch<SetStateAction<OrderForm>>;
    beneficiaries: Array<Beneficiary>
    selectedBeneficiary: Beneficiary | null;
}

interface Indexing {
    [name: string]: string
}

export function ThirdTransactionStep({
  nextStep,
  prevStep,
  orderInfo,
  setOrderInfo,
  beneficiaries,
  selectedBeneficiary,
}: Props) {

  const defaultValues: Indexing = {
    purpose: orderInfo?.purpose || '',
    paymentReference: orderInfo?.paymentReference || ''
  }

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({ defaultValues })

  const onSubmit = (data: Indexing, e: any) => {
    e.preventDefault()
    setOrderInfo((prev) => ({
      ...prev,
      ...data
    }))
    nextStep()
  }

  const getFormErrorMessage = (name: string) =>
    errors[name] && <small className="p-error">{errors[name]?.message}</small>

  useEffect(() => {
    console.log('effect', selectedBeneficiary);
  }, [])

  return (
    <div className={styles.transactionDetailContainer}>
      <TransactionDetails orderInfo={orderInfo} />
      <ClientDetails orderInfo={orderInfo} selectedBeneficiary={selectedBeneficiary} />

      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
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
                  { label: 'Ahorros', value: 'Ahorros' },
                  { label: 'Ayuda familiar', value: 'Ayuda familiar' },
                  { label: 'Gastos', value: 'Gastos' },
                  { label: 'Otros', value: 'Otros' }
                ]}
                className={classNames({
                  'p-invalid': !!errors.purpose
                })}
                placeholder="Selecciona el tipo de finalidad"
              />
            )}
          />
          {getFormErrorMessage('purpose')}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="paymentReference">
            Referencia de pago (opcional)
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
          <Button label="Continuar" className="p-button-info" type="submit" />
        </div>
      </form>
    </div>
  )
}
