import styles from './test.module.css'
import { useRef } from 'react'

export default function Test() {
   const unitRef = useRef()

   return (
      <div className={styles.container}>
         <div className={styles.unit} ref={unitRef} onClick={}>
            Unit
         </div>
      </div>
   )
}
