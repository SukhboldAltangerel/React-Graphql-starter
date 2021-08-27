import React, { useContext } from 'react'
import ModalContext from 'utilities/contexts/modal.context'

export default function Home() {
   const modalCtx = useContext(ModalContext)

   function openModal() {
      modalCtx.setModal({
         open: true,
         content: <a href="/">Hello</a>
      })
   }

   return (
      <div className="" onClick={openModal}>
         home
      </div>
   )
}
