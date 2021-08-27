import React, { useContext } from 'react'
import Router from 'routes/router'
import ThemeContext from 'utilities/contexts/theme.context'
import Alert from 'components/alert/alert'
import Modal from 'components/modal/modal'
import { AlertProvider } from 'utilities/contexts/alert.context'
import { ModalProvider } from 'utilities/contexts/modal.context'
import styles from 'App.module.css'
import LoadingBar from 'components/loadingBar/loadingBar'
import Sidebar from 'components/sidebar/sidebar'
import useDeviceWidth from 'utilities/hooks/useDeviceWidth'
import SideBarMobile from 'components/sidebarMobile/sidebarMoblie'
import Chat from 'components/chat/chat'

export default function App() {
  const themeCtx = useContext(ThemeContext)
  const device = useDeviceWidth()

  return (
    <div className={styles.appContainer}>
      <div className={styles.background} />
      <LoadingBar />
      {device === 'desktop' &&
        <Chat />
      }
      <AlertProvider>
        <Alert />
        <ModalProvider>
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
        </ModalProvider>
      </AlertProvider>
    </div>
  )
}
