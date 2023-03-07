import { useState, useRef, useContext } from 'react'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import { Toast } from 'primereact/toast'
import { setCookie } from 'nookies'
import { useRouter } from 'next/router'
import styles from '../styles/Login.module.css'
import { loginUser } from '../services/users'
import { api } from '../services/apiClient'
import { AuthContext } from '../context/AuthContext'

export function LoginComponent() {
  const [loading, setLoading] = useState(false)
  const defaultValues = {
    email: '',
    password: ''
  }
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({ defaultValues })

  const toast = useRef(null)

  const router = useRouter()

  const { setUser } = useContext(AuthContext)

  const onSubmit = async (data, e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await loginUser(data)

      setCookie(undefined, 'nextauth.token', response.data.accessToken, {
        maxAge: 60 * 60 * 24 * 30
      })

      setCookie(undefined, 'nextauth.refreshtoken', response.data.refreshToken)

      api.defaults.headers.Authorization = response.data.accessToken

      const { data: user } = await api.get('/users/me')

      setUser({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified
      })

      toast.current.show({
        severity: 'success',
        summary: '¡Login exitoso!',
        life: 3000
      })

      router.push('/app')
    } catch (error) {
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

  const getFormErrorMessage = (name) =>
    errors[name] && <small className="p-error">{errors[name]?.message}</small>

  return (
    <>
      <Toast ref={toast} />
      <div className={styles.loginContainer}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
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
              className={classNames({ 'p-error': !!errors.password })}
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
                  className={classNames({ 'p-invalid': !!errors.password })}
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
          <Link href="/signup">Registrate</Link>
        </div>
        <div className={styles.loginHelpContainer}>
          <p>¿Olvidaste tu contraseña?</p>
          <Link href="/">Recuperar contraseña</Link>
        </div>
      </div>
    </>
  )
}
