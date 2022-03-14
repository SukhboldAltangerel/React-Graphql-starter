import styles from './card.module.css'
import { useState } from 'react'

const imgUrl = 'https://ub1.cdn.mplus.mn/r_md_h/images/publication/covers/52355/5f1556f2_a83a24_0.68.jpg'

export default function Card() {
   const [offsets, setOffsets] = useState({
      x: null,
      y: null
   })

   return (
      <div className={styles.cardContainer}>
         <div className={styles.imageContainer}>
            <img className={styles.image} src={imgUrl} alt='card' />
         </div>
      </div>
   )
}
