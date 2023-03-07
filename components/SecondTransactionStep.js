import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { classNames } from 'primereact/utils'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import styles from '../styles/TransactionSteps.module.css'

export function SecondTransactionStep({
  nextStep,
  prevStep,
  orderInfo,
  setOrderInfo
}) {
  const [checked, setChecked] = useState(orderInfo?.saveBeneficiary || false)

  const defaultValues = {
    documentId: orderInfo?.documentId || '',
    bankName: orderInfo?.bankName || '',
    accountId: orderInfo?.accountId || '',
    accountType: orderInfo?.accountType || '',
    name: orderInfo?.name || '',
    phoneNumber: orderInfo?.phoneNumber || '',
    saveBeneficiary: orderInfo?.saveBeneficiary || false,
    newBeneficiary: orderInfo?.newBeneficiary || false
  }

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({ defaultValues })

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
                options={[
                  {
                    label: '100% Banco',
                    value: '100% Banco'
                  },
                  {
                    label: 'Banco Activo',
                    value: 'Banco Activo'
                  },
                  {
                    label: 'Banco Bicentenario',
                    value: 'Banco Bicentenario'
                  },
                  {
                    label: 'Banco Caroní',
                    value: 'Banco Caroní'
                  },
                  {
                    label: 'Banco de Venezuela',
                    value: 'Banco de Venezuela'
                  },
                  {
                    label: 'Banco del Sur',
                    value: 'Banco del Sur'
                  },
                  {
                    label: 'Banco del Tesoro',
                    value: 'Banco del Tesoro'
                  },
                  {
                    label: 'Banco Exterior',
                    value: 'Banco Exterior'
                  },
                  {
                    label: 'Banco Mercantil',
                    value: 'Banco Mercantil'
                  },
                  {
                    label: 'Bancamiga',
                    value: 'Bancamiga'
                  },
                  {
                    label: 'Bancaribe',
                    value: 'Bancaribe'
                  },
                  {
                    label: 'Bancrecer',
                    value: 'Bancrecer'
                  },
                  {
                    label: 'Bangente',
                    value: 'Bangente'
                  },
                  {
                    label: 'Banesco',
                    value: 'Banesco'
                  },
                  {
                    label: 'BFC - Banco Fondo Común',
                    value: 'BFC - Banco Fondo Común'
                  },
                  {
                    label: 'BOD - Banco Occidental de Descuento',
                    value: 'BOD - Banco Occidental de Descuento'
                  },
                  {
                    label: 'Bancos Venezolano de Crédito',
                    value: 'Bancos Venezolano de Crédito'
                  },
                  {
                    label: 'Banplus',
                    value: 'Banplus'
                  },
                  {
                    label: 'Banplus',
                    value: 'Banplus'
                  },
                  {
                    label: 'Banco Plaza',
                    value: 'Banco Plaza'
                  },
                  {
                    label: 'Banco Sofitasa',
                    value: 'Banco Sofitasa'
                  },
                  {
                    label: 'BBVA Provincial',
                    value: 'BBVA Provincial'
                  },
                  {
                    label: 'BNC - Banco Nacional de Crédito',
                    value: 'BNC - Banco Nacional de Crédito'
                  },
                  {
                    label: 'Citibank Sucursal Venezuela',
                    value: 'Citibank Sucursal Venezuela'
                  },
                  {
                    label: 'Mi Banco',
                    value: 'Mi Banco'
                  }
                ]}
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

        <div className={styles.inputContainer}>
          <Controller
            name="saveBeneficiary"
            control={control}
            render={({ field }) => (
              <div className={styles.checkbox}>
                <Checkbox
                  inputId={field.name}
                  value={field.value}
                  checked={checked}
                  onChange={(e) => {
                    setChecked(e.checked)
                    field.onChange(e.checked)
                  }}
                />
                <label htmlFor={field.name}>
                  Guardar destinatario para futura transacciones
                </label>
              </div>
            )}
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
