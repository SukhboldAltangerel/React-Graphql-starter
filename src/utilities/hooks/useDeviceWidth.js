import { useEffect, useState } from 'react'

export default function useDeviceWidth() {
   const [device, setDevice] = useState()

   function handleResize() {
      const windowWidth = window.innerWidth

      if (!windowWidth) {
         setDevice(undefined)
         return
      }

      if (windowWidth <= 640) {
         setDevice('mobile')
      } else {
         setDevice('desktop')
      }
   }

   useEffect(() => {
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
   }, [])

   return device
}
