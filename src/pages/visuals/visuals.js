import { useMemo, useState } from 'react'
import Card from './card/card'
import Menu1 from './menu1/menu1'
import { Recursive } from './recursive/recursive'
import Three1 from './three1/three1'
import styles from './visuals.module.css'

const tabs = [
   Card,
   Three1,
   Recursive,
   Menu1
]

export default function Visuals() {
   const [tabIndex, setTabIndex] = useState(0)
   const TabComponent = useMemo(() => tabs[tabIndex], [tabIndex])

   return (
      <div className={styles.visualsContainer}>
         <div className="">
            {tabs.map((_, i) => (
               <button onClick={() => setTabIndex(i)} key={i}>
                  tab {i + 1}
               </button>
            ))}
         </div>
         <div className="">
            <TabComponent />
         </div>
      </div>
   )
}
