import React, { useContext } from 'react'
import Router from 'routes/router'
import ThemeContext from 'utilities/theme.context'
import Alert from 'components/alert/alert'
import Modal from 'components/modal/modal'
import AlertContext, { AlertProvider } from 'utilities/alert.context'
import { ModalProvider } from 'utilities/modal.context'
import styles from 'App.module.css'
import LoadingBar from 'components/loadingBar/loadingBar'

export default function App() {
  const themeCtx = useContext(ThemeContext)
  const alertCtx = useContext(AlertContext)

  return (
    <div className={styles.appContainer}>
      <div className={styles.background} />
      <LoadingBar />
      <AlertProvider>
        <Alert />
        <ModalProvider>
          <Modal />
          <Router />
        </ModalProvider>
      </AlertProvider>
    </div>
  )
}
