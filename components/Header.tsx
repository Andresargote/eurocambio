import { useRef } from 'react'
import { Avatar } from 'primereact/avatar'
import { TabMenu } from 'primereact/tabmenu'
import { TieredMenu } from 'primereact/tieredmenu'

import styles from '../styles/Header.module.css'

export default function Header() {
  const menu = useRef(null)

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
              label="A"
              shape="circle"
              size="large"
              style={{ backgroundColor: '#2196F3', color: '#ffffff' }}
            />
          </button>
          <TieredMenu
            model={[
              {
                label: 'Mi cuenta',
                icon: 'pi pi-user'
              },
              {
                label: 'Cerrar sesión',
                icon: 'pi pi-sign-out'
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
          model={[
            { label: 'Envíar remesa', icon: 'pi pi-money-bill' },
            {
              label: 'Historial de transacciones',
              icon: 'pi pi-history'
            }
          ]}
        />
      </nav>
    </header>
  )
}
