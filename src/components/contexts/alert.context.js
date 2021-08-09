import React, { createContext, useState } from 'react'

const AlertContext = createContext()

export function AlertProvider({ children }) {
   const [alert, setAlert] = useState({
      open: false,
      content: null,
   })

   return (
      <AlertContext.Provider value={{ alert, setAlert }}>
         {children}
      </AlertContext.Provider>
   )
}

export default AlertContext
