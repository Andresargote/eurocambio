import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import { Toast } from 'primereact/toast'
import styles from '../styles/SignUp.module.css'
import { createUser } from '../services/users'

type FormValues = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export default function SignUpComponent() {
  const [loading, setLoading] = useState(false)
  const defaultValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  let setTimeOutId: any = null

  const toast = useRef(null)

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({ defaultValues })

  const onSubmit = async (data: FormValues, e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await createUser(data)

      toast.current.show({
        severity: 'success',
        summary: '¡Cuenta creada exitosamente!',
        detail: 'Te vamos a redireccionar para que inicies sesión',
        life: 3000
      })

      setTimeOutId = setTimeout(() => {
        setLoading(false)
        window.location.href = '/login'
      }, 1000)
    } catch (error: any) {
      if (error?.response?.data?.error) {
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: error.response.data.error,
          life: 3000
        })
      } else {
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Ha ocurrido un error, intente nuevamente.',
          life: 3000
        })
      }
      setLoading(false)
    }
  }

  const getFormErrorMessage = (name: keyof FormValues) =>
    errors[name] && <small className="p-error">{errors[name]?.message}</small>

  useEffect(() => () => {
      clearTimeout(setTimeOutId)
    }, [])

  return (
    <>
      <Toast ref={toast} />
      <div className={styles.signUpContainer}>
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.inputContainer}>
            <label
              htmlFor="firstName"
              className={classNames({ 'p-error': !!errors.firstName })}
            >
              Nombre
            </label>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: 'Nombre es requerido.'
              }}
              render={({ field }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({
                    'p-invalid': !!errors.firstName
                  })}
                />
              )}
            />
            {getFormErrorMessage('firstName')}
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
                minLength: {
                  value: 8,
                  message: 'Contraseña debe tener al menos 8 caracteres.'
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
            Si continúas, aceptas los{' '}
            <Link href="/">Términos y condiciones</Link> de Eurocambiovla y
            confirmas que has leído nuestras{' '}
            <Link href="/">Políticas de privacidad</Link>
          </p>
        </div>
      </div>
    </>
  )
}
