import styles from './card.module.css'
import { useState, useRef, useMemo, useCallback, useLayoutEffect } from 'react'

const imgUrl = 'https://ub1.cdn.mplus.mn/r_md_h/images/publication/covers/52355/5f1556f2_a83a24_0.68.jpg'

export default function Card() {
   const [offsets, setOffsets] = useState({
      x: null,
      y: null
   })

   function trackMouse(e) {
      setOffsets({
         x: e.clientX - e.target.offsetLeft,
         y: e.clientY - e.target.offsetTop
      })
   }

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

   useLayoutEffect(() => {
      imgRef.current.style.boxShadow = `${(offsets.x - 150) / 10}px ${(offsets.y - 200) / 10}px 4px black`
   }, [offsets])

   function removeStyle() {
      imgRef.current.animate([{
         boxShadow: 'none'
      }], {
         duration: 300,
         fill: 'forwards'
      })
   }

   return (
      <div className={styles.cardContainer}>
         <div className="">
            <button onClick={imgClick}>
               Toggle
            </button>
         </div>
         <div className={styles.imageContainer}>
            <img className={styles.image} src={imgUrl} alt='card' ref={imgRef} onMouseMove={trackMouse} onMouseLeave={removeStyle} />
         </div>
      </div>
   )
}
