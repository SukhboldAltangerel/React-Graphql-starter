import styles from './menu1.module.css'
import { useState, useRef, useEffect, useCallback } from 'react'

const menuItems = [{
   label: 'Бараа материал',
   children: [{
      label: 'Зарах',
      children: [{
         label: 'Урьдчилсан төлбөрт'
      }, {
         label: 'Дараа төлбөрт'
      }]
   }, {
      label: 'Шилжүүлэх',
   }, {
      label: 'Нэмэх',
   }]
}, {
   label: 'Мөнгөн хөрөнгө',
   children: [{
      label: 'Орлого'
   }, {
      label: 'Зарлага'
   }, {
      label: 'Дансны бичилт'
   }]
}, {
   label: 'Үндсэн хөрөнгө',
   children: [{
      label: 'Лавлах'
   }, {
      label: 'Элэгдэл тооцох'
   }]
}]

const initialSubMenu = {
   open: false,
   subMenuItems: []
}

export default function Menu1() {
   const [subMenu, setSubMenu] = useState({ ...initialSubMenu })

   const labelsContainerRef = useRef()
   const subMenuRef = useRef()

   function showSubMenu(subMenuItems = []) {
      setSubMenu({
         open: true,
         subMenuItems
      })
      subMenuRef.current.style.display = 'inline-flex'

      console.log(subMenu.open)
      subMenuRef.current.animate(subMenu.open
         ? [{
            left: 0
         }, {
            left: 100
         }]
         : [{
            top: 40,
            opacity: 0
         }, {
            top: 20,
            opacity: 1
         }], {
         duration: 300,
         fill: 'forwards'
      })
      console.log('showed subMenu')
   }

   function hideSubMenu() {
      setSubMenu({
         open: false,
         subMenuItems: []
      })
      const hideAnimation = subMenuRef.current.animate([{
         top: 40,
         opacity: 0
      }], {
         duration: 300,
         fill: 'forwards'
      })
      hideAnimation.onfinish = () => {
         subMenuRef.current.style.display = 'none'
      }
      console.log('hide subMenu')
   }

   function mouseLeaveLabelsContainer(e) {
      console.log('mouse left labels container')
      console.log(subMenuRef.current.contains(e.target))
      if (!subMenuRef.current.contains(e.target)) {
         hideSubMenu()
      }
   }

   function mouseLeaveSubMenu(e) {
      console.log('mouse left subMenu')
      console.log(labelsContainerRef.current.contains(e.target))
      if (!labelsContainerRef.current.contains(e.target)) {
         hideSubMenu()
      }
   }

   return (
      <div className={styles.menuContainer}>
         <div className={styles.labelsContainer} ref={labelsContainerRef} onMouseLeave={mouseLeaveLabelsContainer}>
            {menuItems.map((item, i) =>
               <div className={styles.label} key={i} onMouseEnter={() => showSubMenu(item.children)}>
                  {item.label}
               </div>
            )}
         </div>
         <div className={styles.subMenuContainer} ref={subMenuRef} onMouseLeave={mouseLeaveSubMenu}>
            {subMenu.subMenuItems.map((item, i) =>
               <div className={styles.subLabel} key={i}>
                  {item.label}
               </div>
            )}
         </div>
      </div>
   )
}
