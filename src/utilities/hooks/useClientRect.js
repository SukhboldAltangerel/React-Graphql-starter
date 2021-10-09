import { useCallback, useLayoutEffect, useMemo, useState } from 'react'

export default function useClientRect() {
   const [element, setElement] = useState()
   const [rect, setRect] = useState({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
   })

   const ref = useCallback(node => {
      node && setElement(node)
   }, [])

   const observer = useMemo(() => new window.ResizeObserver(entries => {
      if (entries[0]) {
         const { x, y, width, height, top, left, bottom, right } = entries[0].contentRect
         setRect({ x, y, width, height, top, left, bottom, right })
      }
   }), [])

   useLayoutEffect(() => {
      if (!element) return
      observer.observe(element)
      return () => observer.disconnect()
   }, [element])

   return [ref, rect]
}
