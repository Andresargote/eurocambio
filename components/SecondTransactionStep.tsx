import { Dispatch, SetStateAction, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { classNames } from 'primereact/utils'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import styles from '../styles/TransactionSteps.module.css'
import { Beneficiary, OrderForm } from '../services/orders'
import { bankOptions } from '../utils/bankOptions'

interface Props {
  nextStep: () => void
  prevStep: () => void
  orderInfo: OrderForm
  setOrderInfo: Dispatch<SetStateAction<OrderForm>>
  beneficiaries: Array<Beneficiary>
  setBeneficiaryById: (id: string) => void;
}

interface Indexing {
  [name: string]: string;
}

export function SecondTransactionStep({
  nextStep,
  prevStep,
  orderInfo,
  setOrderInfo,
  beneficiaries,
  setBeneficiaryById,
}: Props) {

  const defaultValues: Indexing = {
    documentId: orderInfo?.documentId || '',
    bankName: orderInfo?.bankName || '',
    accountId: orderInfo?.accountId || '',
    accountType: orderInfo?.accountType || '',
    name: orderInfo?.name || '',
    phoneNumber: orderInfo?.phoneNumber || '',
    beneficiary: orderInfo?.beneficiary || '',
  }

  const [checked, setChecked] = useState<boolean>(false)

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({ defaultValues })

  const onSubmit = (data: Indexing, e: any) => {
    e.preventDefault()
    if (!checked) {
      setBeneficiaryById(data.beneficiary)
    }
    setOrderInfo((prev) => ({
      ...prev,
      ...data
    }))
    nextStep()
  }

  const getFormErrorMessage = (name: string) =>
    errors[name] && (
      <small className="p-error">{`${errors[name]?.message}`}</small>
    )


  return (
    <div>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.checkbox}>
          <Checkbox
            inputId="choose"
            value={checked}
            checked={checked}
            onChange={(e) => setChecked(!e.value)}
          />
          <label htmlFor="choose">Pago no registrado</label>
        </div>
        {checked ? (
          <>
            <div className={styles.inputContainer}>
              <label
                htmlFor="name"
                className={classNames({
                  'p-error': !!errors.name
                })}
              >
                Nombre completo del destinatario
              </label>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: 'Este campo es requerido.'
                }}
                render={({ field }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    className={classNames({
                      'p-invalid': !!errors.name
                    })}
                  />
                )}
              />
              {getFormErrorMessage('name')}
            </div>

            <div className={styles.inputContainer}>
              <label
                htmlFor="phoneNumber"
                className={classNames({
                  'p-error': !!errors.phoneNumber
                })}
              >
                Número de teléfono del destinatario
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                rules={{
                  required: 'Este campo es requerido.',
                  pattern: {
                    value:
                      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                    message: 'El número de teléfono no es válido.'
                  }
                }}
                render={({ field }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    className={classNames({
                      'p-invalid': !!errors.phoneNumber
                    })}
                  />
                )}
              />
              {getFormErrorMessage('phoneNumber')}
            </div>

            <div className={styles.inputContainer}>
              <label
                htmlFor="documentId"
                className={classNames({
                  'p-error': !!errors.documentId
                })}
              >
                Número de cédula del destinatario
              </label>
              <Controller
                name="documentId"
                control={control}
                rules={{
                  required: 'Este campo es requerido.',
                  pattern: {
                    value: /^\d{7,8}$/,
                    message: 'El número de cédula no es válido.'
                  }
                }}
                render={({ field }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    className={classNames({
                      'p-invalid': !!errors.documentId
                    })}
                  />
                )}
              />
              {getFormErrorMessage('documentId')}
            </div>

            <div className={styles.inputContainer}>
              <label
                htmlFor="bankName"
                className={classNames({ 'p-error': !!errors.bankName })}
              >
                Banco del destinario
              </label>
              <Controller
                name="bankName"
                control={control}
                rules={{
                  required: 'Este campo es requerido.'
                }}
                render={({ field }) => (
                  <Dropdown
                    id={field.name}
                    filter
                    filterBy="label"
                    {...field}
                    options={bankOptions}
                    className={classNames({
                      'p-invalid': !!errors.bankName
                    })}
                    placeholder="Selecciona el banco del destinario"
                  />
                )}
              />
              {getFormErrorMessage('bankName')}
            </div>

            <div className={styles.inputContainer}>
              <label
                htmlFor="accountId"
                className={classNames({
                  'p-error': !!errors.accountId
                })}
              >
                Número de cuenta del destinatario
              </label>
              <Controller
                name="accountId"
                control={control}
                rules={{
                  required: 'Este campo es requerido.'
                }}
                render={({ field }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    className={classNames({
                      'p-invalid': !!errors.accountId
                    })}
                  />
                )}
              />
              {getFormErrorMessage('accountId')}
            </div>

            <div className={styles.inputContainer}>
              <label
                htmlFor="accountType"
                className={classNames({ 'p-error': !!errors.accountType })}
              >
                Tipo de cuenta del destinatario
              </label>
              <Controller
                name="accountType"
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
                        label: 'Cuenta de ahorros',
                        value: 'Cuenta de ahorros'
                      },
                      {
                        label: 'Cuenta corriente',
                        value: 'Cuenta corriente'
                      }
                    ]}
                    className={classNames({
                      'p-invalid': !!errors.accountType
                    })}
                    placeholder="Selecciona el tipo de cuenta"
                  />
                )}
              />
              {getFormErrorMessage('accountType')}
            </div>
          </>
        ) : (
          <div className={styles.inputContainer}>
            <label
              htmlFor="shippingMethod"
              className={classNames({ 'p-error': !!errors.shippingMethod })}
            >
              Elige a tu destinatario
            </label>
            <Controller
              name="beneficiary"
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
                  options={beneficiaries.map((b) => ({
                    label: b.name,
                    value: b.id
                  }))}
                  placeholder="Elige a tu destinatario"
                />
              )}
            />
            {getFormErrorMessage('shippingMethod')}
          </div>
        )}
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
