import React from 'react'
import styles from './button.module.css'

export default function Button({ children, onClick, buttonStyle }) {

   return (
      <button className={`${styles.button} ${buttonStyle}`} onClick={onClick}>
         {children}
      </button>
   )
}
