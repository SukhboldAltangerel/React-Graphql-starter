import { Suspense, useState } from 'react'
import styles from './jotai.module.css'
import { atom, useAtom } from 'jotai'

const stringAtom = atom('initial')
const postsAsyncAtom = atom(
   async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      return await res.json()
   }
)
const fetchPostsAsyncAtom = atom(
   null,
   async (get, set, args) => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await res.json()
      set(postsAsyncAtom, data)
   }
)

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
         <Suspense fallback="Loading ...">
            <div className="">
               {{
                  1: <Tab1 />,
                  2: <Tab2 />
               }[tab]}
            </div>
         </Suspense>
      </div>
   )
}

function Tab1() {
   const [string, setString] = useAtom(stringAtom)
   const [posts] = useAtom(postsAsyncAtom)

   return (
      <div className="">
         Jotai tab 1
         <div className="">
            <input value={string} onChange={e => setString(e.target.value)} />
         </div>
         <div className="">
            {JSON.stringify(posts)}
         </div>
      </div>
   )
}

function Tab2() {
   const [string] = useAtom(stringAtom)
   const [, refetchPosts] = useAtom(fetchPostsAsyncAtom)

   function refetch() {
      refetchPosts()
   }

   return (
      <div className="">
         Jotai tab 2
         <div className="">
            {string}
         </div>
         <div className="">
            <button onClick={refetch}>
               Refetch posts
            </button>
         </div>
      </div>
   )
}
