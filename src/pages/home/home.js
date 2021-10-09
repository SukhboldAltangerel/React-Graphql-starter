import Button from 'components/button/button'
import React, { useContext } from 'react'
import ModalContext from 'utilities/contexts/modal.context'

export default function Home() {
   const modalCtx = useContext(ModalContext)

   function openModal() {
      modalCtx.setModal({
         open: true,
         content: <a href="/" style={{ padding: 24, display: 'block' }}>Hello</a>
      })
   }

   return (
      <div className="" onClick={openModal}>
         <Button onClick={openModal} >
            open modal
         </Button>
      </div>
   )
}
