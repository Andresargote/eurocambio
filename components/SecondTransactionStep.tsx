import { Controller, useForm } from 'react-hook-form'
import { classNames } from 'primereact/utils'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'
import { TransactionStepProps } from '../utils/interfaces/transaction-step-props'
import styles from '../styles/TransactionSteps.module.css'

type FormValues = {
  identityDocument: string
  identityDocumentNumber: string
  bank: string
  accountNumber: string
  accountType: string
  accountHolderName: string
  accountHolderLastName: string
  accountHolderPhoneNumber: string
}

export function SecondTransactionStep({
  nextStep,
  prevStep
}: TransactionStepProps) {
  const defaultValues: FormValues = {
    identityDocument: '',
    identityDocumentNumber: '',
    bank: '',
    accountNumber: '',
    accountType: '',
    accountHolderName: '',
    accountHolderLastName: '',
    accountHolderPhoneNumber: ''
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({ defaultValues })

  return (
    <div>
      <form className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <label
            htmlFor="identityDocument"
            className={classNames({ 'p-error': !!errors.identityDocument })}
          >
            Selecciona el tipo de documento de identidad del destinatario
          </label>
          <Controller
            name="identityDocument"
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
                    label: 'Cédula de ciudadanía',
                    value: 'Cédula de ciudadanía'
                  },
                  {
                    label: 'Cédula de extranjería',
                    value: 'Cédula de extranjería'
                  },
                  { label: 'Pasaporte', value: 'Pasaporte' },
                  {
                    label: 'Tarjeta de identidad',
                    value: 'Tarjeta de identidad'
                  }
                ]}
                className={classNames({
                  'p-invalid': !!errors.identityDocument
                })}
                placeholder="Selecciona el documento de identidad"
              />
            )}
          />
        </div>

        <div className={styles.inputContainer}>
          <label
            htmlFor="identityDocumentNumber"
            className={classNames({
              'p-error': !!errors.identityDocumentNumber
            })}
          >
            Número de documento del destinatario
          </label>
          <Controller
            name="identityDocumentNumber"
            control={control}
            rules={{
              required: 'Este campo es requerido.'
            }}
            render={({ field }) => (
              <InputText
                id={field.name}
                {...field}
                className={classNames({
                  'p-invalid': !!errors.identityDocumentNumber
                })}
              />
            )}
          />
        </div>

        <div className={styles.inputContainer}>
          <label
            htmlFor="bank"
            className={classNames({ 'p-error': !!errors.bank })}
          >
            Selecciona el banco del destinario
          </label>
          <Controller
            name="bank"
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
                    label: 'Banco de Bogotá',
                    value: 'Banco de Bogotá'
                  },
                  {
                    label: 'Banco de Occidente',
                    value: 'Banco de Occidente'
                  },
                  {
                    label: 'Banco de la República',
                    value: 'Banco de la República'
                  },
                  {
                    label: 'Banco de Credito',
                    value: 'Banco de Credito'
                  }
                ]}
                className={classNames({
                  'p-invalid': !!errors.bank
                })}
                placeholder="Selecciona el banco del destinario"
              />
            )}
          />
        </div>

        <div className={styles.inputContainer}>
          <label
            htmlFor="accountNumber"
            className={classNames({
              'p-error': !!errors.accountNumber
            })}
          >
            Número de cuenta del destinatario
          </label>
          <Controller
            name="accountNumber"
            control={control}
            rules={{
              required: 'Este campo es requerido.'
            }}
            render={({ field }) => (
              <InputText
                id={field.name}
                {...field}
                className={classNames({
                  'p-invalid': !!errors.accountNumber
                })}
              />
            )}
          />
        </div>

        <div className={styles.inputContainer}>
          <label
            htmlFor="accountType"
            className={classNames({ 'p-error': !!errors.accountType })}
          >
            Selecciona el tipo de cuenta del destinatario
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
        </div>

        <div className={styles.inputContainer}>
          <label
            htmlFor="accountHolderName"
            className={classNames({
              'p-error': !!errors.accountHolderName
            })}
          >
            Nombre del titular de la cuenta
          </label>
          <Controller
            name="accountHolderName"
            control={control}
            rules={{
              required: 'Este campo es requerido.'
            }}
            render={({ field }) => (
              <InputText
                id={field.name}
                {...field}
                className={classNames({
                  'p-invalid': !!errors.accountHolderName
                })}
              />
            )}
          />
        </div>

        <div className={styles.inputContainer}>
          <label
            htmlFor="accountHolderName"
            className={classNames({
              'p-error': !!errors.accountHolderName
            })}
          >
            Apellido del titular de la cuenta
          </label>
          <Controller
            name="accountHolderLastName"
            control={control}
            rules={{
              required: 'Este campo es requerido.'
            }}
            render={({ field }) => (
              <InputText
                id={field.name}
                {...field}
                className={classNames({
                  'p-invalid': !!errors.accountHolderLastName
                })}
              />
            )}
          />
        </div>

        <div className={styles.inputContainer}>
          <label
            htmlFor="accountHolderPhoneNumber"
            className={classNames({
              'p-error': !!errors.accountHolderPhoneNumber
            })}
          >
            Teléfono del titular de la cuenta
          </label>
          <Controller
            name="accountHolderPhoneNumber"
            control={control}
            render={({ field }) => (
              <InputNumber
                id={field.name}
                {...field}
                inputId="accountHolderPhoneNumber"
                className={classNames({
                  'p-invalid': !!errors.accountHolderPhoneNumber
                })}
              />
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
