import { useState } from 'react'
import styles from './zustand.module.css'

export default function Zustand() {
   const [tab, setTab] = useState(1)

   return (
      <div className="">
         <div className="">
            <button className="" onClick={() => setTab(1)}>
               Tab 1
            </button>
            <button className="" onClick={() => setTab(2)}>
               Tab 2
            </button>
         </div>
         <div className="">
            {{
               1: <Tab1 />,
               2: <Tab2 />
            }[tab]}
         </div>
      </div>
   )
}

function Tab1() {
   return (
      <div className="">

      </div>
   )
}

function Tab2() {
   return (
      <div className="">

      </div>
   )
}
