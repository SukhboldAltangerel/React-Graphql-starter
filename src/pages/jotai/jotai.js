import { useState } from 'react'
import styles from './jotai.module.css'
import { atom, useAtom } from 'jotai'

const stringAtom = atom('initial')

export default function Jotai() {
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
   const [string, setString] = useAtom(stringAtom)

   return (
      <div className="">
         Jotai tab 1
         <div className="">
            <input value={string} onChange={e => setString(e.target.value)} />
         </div>
      </div>
   )
}

function Tab2() {
   const string = useAtom(stringAtom)

   return (
      <div className="">
         Jotai tab 2
         <div className="">
            {string}
         </div>
      </div>
   )
}
