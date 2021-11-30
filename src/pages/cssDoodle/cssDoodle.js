import { useRef } from 'react'
import styles from './cssDoodle.module.css'
import 'css-doodle'

export default function CssDoodle() {
   const doodleRef = useRef()

   function updateDoodle() {
      doodleRef.current.update()
   }

   return (
      <div className={styles.container} onClick={updateDoodle}>
         Css doodle
         <css-doodle ref={doodleRef}>
            {`
               :doodle {
                  @grid: 20 / 100vmax;
                  background: #0a0c27;
                  font-family: sans-serif;
                  overflow: hidden;
               }
               :after {
                  content: \@hex.@r(0x2500, 0x257f);
                  color: hsla(@r360, 70%, 70%, @r.9);
                  font-size: 8vmin;
               }
            `}
         </css-doodle>
      </div>
   )
}
