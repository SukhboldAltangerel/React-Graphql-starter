import styles from './card.module.css'
import { useState, useRef } from 'react'

const imgUrl = 'https://ub1.cdn.mplus.mn/r_md_h/images/publication/covers/52355/5f1556f2_a83a24_0.68.jpg'

export default function Card() {
   const [offsets, setOffsets] = useState({
      x: null,
      y: null
   })

   const [moved, setMoved] = useState(false)

   const imgRef = useRef()

   function imgClick() {
      const animation = imgRef.current.animate([{
         transform: `translateX(${moved ? 0 : '200px'})`,
         opacity: moved ? 1 : 0
      }], {
         duration: 300,
         fill: 'forwards'
      })
      if (moved) {
         imgRef.current.style.display = 'block'
      } else {
         animation.addEventListener('finish', () => {
            imgRef.current.style.display = 'none'
         })
      }
      setMoved(prev => !prev)
   }

   return (
      <div className={styles.cardContainer}>
         <button onClick={imgClick}>
            Toggle
         </button>
         <div className={styles.imageContainer}>
            <img className={styles.image} src={imgUrl} alt='card' ref={imgRef} />
         </div>
      </div>
   )
}
