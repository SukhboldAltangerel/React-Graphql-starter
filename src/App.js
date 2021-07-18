import React, { useContext } from 'react'
import Router from 'routes/router'
import ThemeContext from 'utilities/theme.context'
import Alert from 'components/alert/alert'
import Modal from 'components/modal/modal'
import { AlertStore } from 'utilities/alert.context'
import { ModalStore } from 'utilities/modal.context'
import styles from 'App.module.css'

export default function App() {
  const themeCtx = useContext(ThemeContext)

  return (
    <div className={styles.appContainer}>
      <div className={styles.background} />
      <AlertStore>
        <Alert />
        <ModalStore>
          <Modal />
          <Router />
        </ModalStore>
      </AlertStore>
    </div>
  )
}
