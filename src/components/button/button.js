import React from 'react'
import styles from './button.module.css'

export default function Button({ content, children, callback }) {


   return (
      <button className={StyleSheet.button} onClick={callback}>
         {content ?? children}
      </button>
   )
}
