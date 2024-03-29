import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { LoginComponent } from '../components/LoginComponent'

import styles from '../styles/Login.module.css'

export default function Login() {
  return (
    <>
      <Head>
        <title>Eurocambiovla - Inicia sesión</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.containerLoginTitle}>
          ¡Bienvenido a Eurocambiovla!
        </h1>
        <main>
          <LoginComponent />
        </main>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx)

  if (cookies['nextauth.token']) {
    return {
      redirect: {
        destination: '/app',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
