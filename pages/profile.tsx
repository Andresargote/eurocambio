import { useEffect, useState } from 'react'
import Head from 'next/head'

import { ProgressSpinner } from 'primereact/progressspinner'
import { Divider } from 'primereact/divider'

import Header from '../components/Header'
import { ProfileForm } from '../components/ProfileForm'
import { getUserInfo, User } from '../services/users'
import { Button } from 'primereact/button'
import styles from '../styles/TransactionSteps.module.css'


export default function ProfilePage() {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getUserInfo()
            .then((data) => setUser(data))
            .catch((e) => console.log(e))
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            <Head>
                <title>Eurocambiovla | Perfil</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='container'>
                <Header />
                {loading ? (
                    <ProgressSpinner />
                ) : (
                    <div>
                        <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Mi perfil</h1>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <p style={{ textAlign: 'start' }}>Nombre:</p>
                            <p style={{ textAlign: 'end' }}>{user?.firstName}</p>
                        </div>
                        <Divider />
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <p style={{ textAlign: 'start' }}>Apellido:</p>
                            <p style={{ textAlign: 'end' }}>{user?.lastName}</p>
                        </div>
                        <Divider />
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <p style={{ textAlign: 'start' }}>Email:</p>
                            <p style={{ textAlign: 'end' }}>{user?.email}</p>
                        </div>
                        <Divider />
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <p style={{ textAlign: 'start' }}>Numero telefonico:</p>
                            <p style={{ textAlign: 'end' }}>{user?.profile?.phoneNumber}</p>
                        </div>
                        <Divider />
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <p style={{ textAlign: 'start' }}>Pais de residencia:</p>
                            <p style={{ textAlign: 'end' }}>{user?.profile?.residenceCountry}</p>
                        </div>
                        <Divider />
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <p style={{ textAlign: 'start' }}>Profesion:</p>
                            <p style={{ textAlign: 'end' }}>{user?.profile?.profession}</p>
                        </div>
                        <Divider />
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <p style={{ textAlign: 'start' }}>Numero de documento:</p>
                            <p style={{ textAlign: 'end' }}>{user?.profile?.documentId}</p>
                        </div>
                        <Divider />
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <p style={{ textAlign: 'start' }}>Genero:</p>
                            <p style={{ textAlign: 'end' }}>{user?.profile?.gender}</p>
                        </div>
                        <Divider />
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <p style={{ textAlign: 'start' }}>Direccion:</p>
                            <p style={{ textAlign: 'end' }}>{user?.profile?.address}</p>
                        </div>
                        <Divider />
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <p style={{ textAlign: 'start' }}>Codigo postal:</p>
                            <p style={{ textAlign: 'end' }}>{user?.profile?.postalCode}</p>
                        </div>
                        <Divider />
                        {
                            false && (
                                <ProfileForm data={user?.profile || null} edit />
                            )
                        }
                        <div className={styles.formButtons}>
                            <Button label="Editar" className="p-button-info" />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
