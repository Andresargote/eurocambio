import { useState } from 'react'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import styles from '../styles/Login.module.css'

import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

type FormValues = {
  email: string
  password: string
}

export function LoginComponent() {
  const [loading, setLoading] = useState(false)
  const defaultValues: FormValues = {
    email: '',
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
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
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
                className={classNames({ 'p-invalid': !!errors.email })}
              />
            )}
          />
          {getFormErrorMessage('email')}
        </div>
        <div className={styles.inputContainer}>
          <label
            htmlFor="password"
            className={classNames({ 'p-error': errors.password })}
          >
            Contraseña
          </label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'La contraseña es requerida.'
            }}
            render={({ field }) => (
              <Password
                {...field}
                inputId={field.name}
                feedback={false}
                toggleMask
                className={classNames({ 'p-invalid': errors.password })}
              />
            )}
          />
          {getFormErrorMessage('password')}
        </div>
        <Button
          type="submit"
          label="Iniciar sesión"
          loading={loading}
          className="p-button-info"
        />
      </form>
      <div className={styles.loginHelpContainer}>
        <p>¿Aún no tienes cuenta?</p>
        <Link href="/">Registrate</Link>
      </div>
      <div className={styles.loginHelpContainer}>
        <p>¿Olvidaste tu contraseña?</p>
        <Link href="/">Recuperar contraseña</Link>
      </div>
    </div>
  )
}
