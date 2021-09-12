import React, { createContext, useEffect, useState } from 'react'
import { queryFetch } from 'utilities/fetch'
import { getUserQuery } from 'utilities/graphql/queries'

const UserContext = createContext()

export function UserStore({ children }) {
   const [user, setUser] = useState({})

   useEffect(() => {
      (async () => {
         try {
            const user = await queryFetch(getUserQuery)
            setUser(user.data?.getUser)
         } catch { }
      })()
   }, [])

   return (
      <UserContext.Provider value={{ user, setUser }}>
         {children}
      </UserContext.Provider>
   )
}

export default UserContext
