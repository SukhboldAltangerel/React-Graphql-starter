import { Suspense, useState } from 'react'
import Button from 'components/button/button'
import styles from './recoil.module.css'
import { atomFamily, selectorFamily, useRecoilState, useRecoilStateLoadable, useSetRecoilState } from 'recoil'

const initialCoState = {
   info1: {
      name: null
   },
   table1: [],
   info2: {},
   check2: null
}

function delay(ms, value) {
   return new Promise(resolve => setTimeout(resolve, ms, value))
}

function isPromise(value) {
   return value && value.then && typeof value.then === 'function'
}

const fetchedCoState = {
   info1: {
      name: 'Bold',
      age: 25,
      height: 180
   },
   table1: [{
      year: 2020,
      amount: 300000
   }, {
      year: 2021,
      amount: 6000000
   }],
   info2: {
      test1: 'test1',
      test2: 'test2'
   },
   check2: true
}

const coState = atomFamily({
   key: 'co',
   default: async ({ id }) => {
      if ([undefined, null].includes(id)) {
         return initialCoState
      } else {
         return await delay(2000, fetchedCoState)
      }
   }
})

const coStateField = selectorFamily({
   key: 'coField',
   get: ({ id, field }) => ({ get }) => get(coState({ id: id }))[field]
})

export default function Recoil() {
   const [tab, setTab] = useState(1)

   return (
      <div className="">
         <div className="">
            <Button onClick={() => setTab(1)}>
               Tab 1
            </Button>
            <Button onClick={() => setTab(2)}>
               Tab 2
            </Button>
         </div>
         <div className="">
            <Suspense fallback={<div>FALLBACK!</div>}>
               {{
                  1: <Tab1 />,
                  2: <Tab2 />
               }[tab]}
            </Suspense>
         </div>
      </div>
   )
}

function Tab1() {
   // const [co, setCo] = useRecoilStateLoadable(coState({ id: 999 }))
   // const [infoLoadable, setInfo] = useRecoilStateLoadable(coStateField({ id: 999, field: 'info1' }))
   // const info = isPromise(infoLoadable.contents) ? {} : infoLoadable.contents
   // const [tableLoadable, setTable] = useRecoilStateLoadable(coStateField({ id: 999, field: 'table1' }))
   // const table = isPromise(tableLoadable.contents) ? [] : tableLoadable.contents

   const setCo = useSetRecoilState(coState({ id: 999 }))
   const [info, setInfo] = useRecoilState(coStateField({ id: 999, field: 'info1' }))
   const [table, setTable] = useRecoilState(coStateField({ id: 999, field: 'table1' }))

   function setterInfo(value, ...path) {
      setInfo(prev => ({ ...prev, [path[0]]: value }))
   }

   function settertable(value, ...path) {
      setTable(prev => {
         const next = [...prev]
         next[path[0]][path[1]] = value
         return next
      })
   }

   return (
      <div className="">
         TAB 1
         <div className="">
            name: <input value={info.name ?? ''} onChange={e => setterInfo(e.target.value, 'name')} />
            age: <input type="number" value={info.age ?? ''} onChange={e => setterInfo(e.target.value, 'age')} /> years old
            height: <input type="number" value={info.height ?? ''} onChange={e => setterInfo(e.target.value, 'height')} /> cm
         </div>

         <table className={styles.table}>
            <thead>
               <tr>
                  <th>year</th>
                  <th>amount</th>
               </tr>
            </thead>
            <tbody>
               {table.map((row, i) =>
                  <tr key={i}>
                     <td>
                        <input value={row.year ?? ''} onChange={e => settertable(e.target.value, i, 'year')} />
                     </td>
                     <td>
                        <input value={row.amount ?? ''} onChange={e => settertable(e.target.value, i, 'amount')} />
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
   )
}

function Tab2() {
   const [info, setInfo] = useState(initialCoState.info2)
   const [check, setCheck] = useState(initialCoState.check2)

   function setterInfo(value, ...path) {
      setInfo(prev => ({ ...prev, [path[0]]: value }))
   }

   return (
      <div className="">
         TAB 2
         <div className="">
            test1: <input value={info.test1 ?? ''} onChange={e => setterInfo(e.target.value, 'test1')} />
            test2: <input value={info.test2 ?? ''} onChange={e => setterInfo(e.target.value, 'test2')} />
         </div>

         <div className="">
            check: <input type="checkbox" checked={check} onChange={e => setCheck(e.target.checked)} />
         </div>
      </div>
   )
}
