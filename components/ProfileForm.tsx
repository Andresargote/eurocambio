import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'

import styles from '../styles/TransactionSteps.module.css'
import { Profile } from '../services/users'

const genders = [
  { name: 'Masculino' },
  { name: 'Femenino' }
]

interface Indexing {
  [name: string]: string
}

interface ProfileData extends Indexing {
    documentId: string,
    gender: string,
    address: string,
    postalCode: string,
    profession: string,
    phoneNumber: string,
    isoCode: string,
    residenceCountry: string
}

interface Props {
  edit: boolean,
  data: Profile | null
}

export function ProfileForm({ data, edit = true }: Props) {

  const router = useRouter()

  const INITIAL_VALUES: ProfileData = {
    gender: data?.gender || "",
    documentId: data?.documentId || "",
    postalCode: data?.postalCode || "",
    profession: data?.profession || "",
    phoneNumber: data?.phoneNumber || "",
    isoCode: data?.isoCode || "",
    residenceCountry: data?.residenceCountry || "",
    address: data?.address || "",
  }

  const {
      control,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: INITIAL_VALUES
  });

  async function onSubmit(values: ProfileData, e: any) {
    e.preventDefault();
    console.log(values);
    router.push('/app')
  }

  const getFormErrorMessage = (name: string) =>
    errors[name] && (
      <small className="p-error">{`${errors[name]?.message}`}</small>
    )

  return (
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <h2 style={{ textAlign: "center" }}>{edit ? "Actualizar perfil" : "Agregar perfil"}</h2>
        <div className={styles.inputContainer}>
          <label
            htmlFor="gender"
            className={classNames({
              'p-error': !!errors.phoneNumber
            })}
          >Genero</label>
          <Controller
          control={control}
          name='gender'
          rules={{ required: 'Este campo es requerido' }}
            render={({ field }) => (
          <Dropdown
            {...field}
            options={genders}
            optionLabel='name'
            optionValue='name'
            className="w-full md:w-14rem"
          />
            )}
          />
        </div>
           <div className={styles.inputContainer}>
             <label
               htmlFor='documentId'
               className={classNames({
                 'p-error': !!errors.phoneNumber
               })}
             >Numero de documento</label>
             <Controller
                control={control}
               name='documentId'
               rules={{ required: 'Este campo es requerido' }}
               render={({field}) => (
                <InputText id={field.name} {...field} />
               )}
             />
              {getFormErrorMessage('documentId')}
           </div>
           <div className={styles.inputContainer}>
             <label
               htmlFor='postalCode'
               className={classNames({
                 'p-error': !!errors.phoneNumber
               })}
             >Codigo postal</label>
             <Controller
             control={control}
               name='postalCode'
               rules={{ required: 'Este campo es requerido' }}
               render={({field}) => (
                <InputText id={field.name} {...field} />
               )}
             />
              {getFormErrorMessage('postalCode')}
           </div>
           <div className={styles.inputContainer}>
             <label
               htmlFor='profession'
               className={classNames({
                 'p-error': !!errors.phoneNumber
               })}
             >Profesion</label>
             <Controller
             control={control}
               name='profession'
               rules={{ required: 'Este campo es requerido' }}
               render={({field}) => (
                <InputText id={field.name} {...field} />
               )}
             />
              {getFormErrorMessage('profession')}
           </div>
           <div className={styles.inputContainer}>
             <label
               htmlFor='phoneNumber'
               className={classNames({
                 'p-error': !!errors.phoneNumber
               })}
             >Numero telefonico</label>
             <Controller
             control={control}
               name='phoneNumber'
               rules={{ required: 'Este campo es requerido' }}
               render={({field}) => (
                <InputText id={field.name} {...field} />
               )}
             />
              {getFormErrorMessage('phoneNumber')}
           </div>
           <div className={styles.inputContainer}>
             <label
               htmlFor='residenceCountry'
               className={classNames({
                 'p-error': !!errors.phoneNumber
               })}
             >Pais de residencia</label>
             <Controller
             control={control}
               name='residenceCountry'
               rules={{ required: 'Este campo es requerido' }}
               render={({field}) => (
          <Dropdown
            {...field}
            options={genders}
            optionLabel='name'
            optionValue='name'
            className="w-full md:w-14rem"
          />
               )}
             />
              {getFormErrorMessage('residenceCountry')}
           </div>
           <div className={styles.inputContainer}>
             <label
               htmlFor='address'
               className={classNames({
                 'p-error': !!errors.phoneNumber
               })}
             >Direccion</label>
             <Controller
             control={control}
               name=''
               rules={{ required: 'Este campo es requerido' }}
               render={({field}) => (
                <InputText id={field.name} {...field} />
               )}
             />
           </div>
        <div className={styles.formButtons}>
          <Button label="Continuar" className="p-button-info" type="submit" />
        </div>
        </form>
  )
}
