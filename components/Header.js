import { useContext, useRef } from 'react'
import { Avatar } from 'primereact/avatar'
import { TabMenu } from 'primereact/tabmenu'
import { TieredMenu } from 'primereact/tieredmenu'
import { useRouter } from 'next/router'

import styles from '../styles/Header.module.css'
import { AuthContext } from '../context/AuthContext'

export default function Header() {
  const menu = useRef(null)
  const { user, signOut } = useContext(AuthContext)
  const router = useRouter()

  const items = [
    {
        index: 0,
        label: 'Envíar remesa',
        icon: 'pi pi-money-bill',
        route: '/app',
        command: () => router.push('/app')
    },
    {
        index: 1,
        label: 'Historial de transacciones',
        icon: 'pi pi-history',
        route: '/order-history',
        command: () => router.push('/order-history')
    },
    true && {
        index: 2,
        label: 'Tipos de cambio',
        icon: 'pi pi-money-bill',
        route: '/exchange-rates',
        command: () => router.push('/exchange-rates')
    }
  ];

  return (
    <header className={styles.header}>
      <div className={styles.containerPageNameAndAvatar}>
        <h1>Eurocambiovzl</h1>
        <div>
          <button
            type="button"
            className={styles.avatarButton}
            aria-haspopup
            aria-controls="overlay_tmenu"
            onClick={(event) => menu.current.toggle(event)}
          >
            <Avatar
              label={user?.firstName.charAt(0)}
              shape="circle"
              size="large"
              style={{ backgroundColor: '#2196F3', color: '#ffffff' }}
            />
          </button>
          <TieredMenu
            model={[
              {
                label: 'Cerrar sesión',
                icon: 'pi pi-sign-out',
                command: () => signOut()
              }
            ]}
            popup
            ref={menu}
            id="overlay_tmenu"
          />
        </div>
      </div>
      <nav>
        <TabMenu
          model={items}
          activeIndex={items.find(i => i.route === router.pathname).index}
        />
      </nav>
    </header>
  )
}
