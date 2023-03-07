import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import SignUpComponent from '../components/SignUpComponent'
import styles from '../styles/SignUp.module.css'

export default function Login() {
  return (
    <>
      <Head>
        <title>Eurocambiovla - Regístrate</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.containerSignUpTitle}>
          Regístrate a Eurocambiovla
        </h1>

        <main>
          <SignUpComponent />
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
