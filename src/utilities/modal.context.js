import React, { createContext, useState } from 'react'

const ModalContext = createContext()

export function ModalProvider({ children }) {
   const [modal, setModal] = useState({
      open: false,
      content: null,
   })

   return (
      <ModalContext.Provider value={{ modal, setModal }}>
         {children}
      </ModalContext.Provider>
   )
}

export default ModalContext
