import React, { useContext } from 'react'
import Router from 'routes/router'
import ThemeContext from 'utilities/contexts/theme.context'
import Alert from 'components/alert/alert'
import Modal from 'components/modal/modal'
import { AlertStore } from 'utilities/contexts/alert.context'
import { ModalStore } from 'utilities/contexts/modal.context'
import styles from 'App.module.css'
import LoadingBar from 'components/loadingBar/loadingBar'
import Sidebar from 'components/sidebar/sidebar'
import useDeviceWidth from 'utilities/hooks/useDeviceWidth'
import SideBarMobile from 'components/sidebar/sidebarMoblie'
import Chat from 'components/chat/chat'
import UserContext from 'utilities/contexts/user.context'

export default function App() {
  const themeCtx = useContext(ThemeContext)
  const userCtx = useContext(UserContext)
  
  const device = useDeviceWidth()

  const user = userCtx.user
  const loggedIn = user?.id !== undefined

  return (
    <div className={styles.appContainer}>
      <div className={styles.background} />
      <LoadingBar />
      {device === 'desktop' && loggedIn &&
        <Chat />
      }
      <AlertStore>
        <Alert />
        <ModalStore>
          <Modal />
          <div className={styles.layout}>
            {device === 'mobile'
              ? <SideBarMobile />
              : <Sidebar />
            }
            <div className={styles.routeWrapper}>
              <Router />
            </div>
          </div>
        </ModalStore>
      </AlertStore>
    </div>
  )
}
