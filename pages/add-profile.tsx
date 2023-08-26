import Head from "next/head";
import Header from '../components/Header'
import { ProfileForm } from '../components/ProfileForm'

export default function AddProfilePage() {
    return (
        <>
            <Head>
                <title>Eurocambiovla | Perfil</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='container'>
                <ProfileForm edit={false} data={null} />
            </div>
        </>
    )
}
