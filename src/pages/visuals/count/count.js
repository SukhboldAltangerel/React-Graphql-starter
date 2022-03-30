import { useLayoutEffect, useState } from 'react'
import styles from './count.module.css'

function easeInOutCubic(x) {
   return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

export default function Count({ start = 0, end = 100 }) {
   const [count, setCount] = useState(start)


   useLayoutEffect(() => {
      const timerId = setTimeout(() => {
         setCount(prev => prev + easeInOutCubic((prev - start) / (end - start)))
      }, 100)
      if (count >= end) {
         clearInterval(timerId)
      }
      return () => clearInterval(timerId)
   }, [count])

   return (
      <div className={styles.container}>
         {count}
      </div>
   )
}
