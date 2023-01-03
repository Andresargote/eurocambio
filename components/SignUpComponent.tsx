import { useState } from 'react'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { classNames } from 'primereact/utils'
import styles from '../styles/SignUp.module.css'

type FormValues = {
  name: string
  lastName: string
  email: string
  gender: string
  password: string
}

export default function SignUpComponent() {
  const [loading, setLoading] = useState(false)
  const defaultValues: FormValues = {
    name: '',
    lastName: '',
    email: '',
    gender: '',
    password: ''
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({ defaultValues })

  const onSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      reset(defaultValues)
    }, 1000)
  }

  const getFormErrorMessage = (name: keyof FormValues) =>
    errors[name] && <small className="p-error">{errors[name]?.message}</small>

  return (
    <div className={styles.signUpContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <label
            htmlFor="name"
            className={classNames({ 'p-error': !!errors.name })}
          >
            Nombre
          </label>
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Nombre es requerido.'
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
            htmlFor="lastName"
            className={classNames({ 'p-error': !!errors.lastName })}
          >
            Apellido
          </label>
          <Controller
            name="lastName"
            control={control}
            rules={{
              required: 'Apellido es requerido.'
            }}
            render={({ field }) => (
              <InputText
                id={field.name}
                {...field}
                className={classNames({
                  'p-invalid': !!errors.lastName
                })}
              />
            )}
          />
          {getFormErrorMessage('lastName')}
        </div>
        <div className={styles.inputContainer}>
          <label
            htmlFor="email"
            className={classNames({ 'p-error': !!errors.email })}
          >
            Email
          </label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email es requerido.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Email no válido. E.g. example@email.com'
              }
            }}
            render={({ field }) => (
              <InputText
                id={field.name}
                {...field}
                className={classNames({
                  'p-invalid': !!errors.email
                })}
              />
            )}
          />
          {getFormErrorMessage('email')}
        </div>
        <div className={styles.inputContainer}>
          <label
            htmlFor="gender"
            className={classNames({ 'p-error': !!errors.gender })}
          >
            Seleccione tu género
          </label>
          <Controller
            name="gender"
            control={control}
            rules={{
              required: 'Género es requerido.'
            }}
            render={({ field }) => (
              <Dropdown
                id={field.name}
                {...field}
                className={classNames({
                  'p-invalid': !!errors.gender
                })}
                options={[
                  { label: 'Masculino', value: 'Masculino' },
                  { label: 'Femenino', value: 'Femenino' },
                  { label: 'Otro', value: 'Otro' }
                ]}
                placeholder="Género"
              />
            )}
          />
          {getFormErrorMessage('gender')}
        </div>
        <div className={styles.inputContainer}>
          <label
            htmlFor="password"
            className={classNames({ 'p-error': !!errors.password })}
          >
            Contraseña
          </label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Contraseña es requerida.',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message:
                  'Contraseña debe tener al menos 8 caracteres, una mayúscula y un número.'
              }
            }}
            render={({ field }) => (
              <Password
                id={field.name}
                {...field}
                className={classNames({
                  'p-invalid': !!errors.password
                })}
                toggleMask
                promptLabel="Ingrese una contraseña"
                weakLabel="Débil"
                mediumLabel="Media"
                strongLabel="Fuerte"
              />
            )}
          />
          {getFormErrorMessage('password')}
        </div>
        <Button
          type="submit"
          label="Registrarse"
          loading={loading}
          className="p-button-success"
        />
      </form>
      <div className={styles.signUpHelpContainer}>
        <p>¿Ya tienes cuenta?</p>
        <Link href="/login">Inicia sesión</Link>
      </div>
      <div className={styles.signUpHelpContainer}>
        <p>
          Si continúas, aceptas los <Link href="/">Términos y condiciones</Link>{' '}
          de Eurocambiovla y confirmas que has leído nuestras{' '}
          <Link href="/">Políticas de privacidad</Link>
        </p>
      </div>
    </div>
  )
}
