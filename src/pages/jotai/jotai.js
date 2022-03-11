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
   async (get, set) => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await res.json()
      set(postsAsyncAtom, data)
   }
)

function atomWithRefresh(fn) {
   const dataAtom = atom()
   return atom(
      get => fn(get),
      (get, set) => set(dataAtom, fn(get))
   )
}

const usersAtom = atomWithRefresh(
   async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await res.json()
      return data
   }
)

const fetchAtom = atom(
   async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await res.json()
      return data
   }
)
const refetchAtom = atom(
   get => get(fetchAtom),
   async (get, set, url) => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await res.json()
      set(fetchAtom, data)
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
   const [users] = useAtom(usersAtom)

   return (
      <div className="">
         Jotai tab 1
         <div className="">
            <input value={string} onChange={e => setString(e.target.value)} />
         </div>
         <div className="">
            {JSON.stringify(posts).slice(0, 100)}
         </div>
         <div className="">
            {JSON.stringify(users).slice(0, 100)}
         </div>
      </div>
   )
}

function Tab2() {
   const [string] = useAtom(stringAtom)
   const [, refetchPosts] = useAtom(fetchPostsAsyncAtom)
   const [, refetchUsers] = useAtom(usersAtom)
   const [data, refetchData] = useAtom(refetchAtom)

   return (
      <div className="">
         Jotai tab 2
         <div className="">
            {string}
         </div>
         <div className="">
            <button onClick={refetchPosts}>
               Refetch posts
            </button>
         </div>
         <div className="">
            <button onClick={refetchUsers}>
               Refetch users
            </button>
         </div>
         <div className="">
            {JSON.stringify(data)?.slice(0, 100)}
            <button onClick={refetchData}>compute</button>
         </div>
      </div>
   )
}
