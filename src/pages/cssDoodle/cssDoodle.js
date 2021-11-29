import styles from './cssDoodle.module.css'
import 'css-doodle'

export default function CssDoodle() {
   return (
      <div className="">
         Css doodle
         <css-doodle grid="5">
            {`
            :doodle {
               grid - gap: 1px;
               width: 8em;
               height: 8em;
            }
            background: #60569e;
            `}
         </css-doodle>
      </div>
   )
}
