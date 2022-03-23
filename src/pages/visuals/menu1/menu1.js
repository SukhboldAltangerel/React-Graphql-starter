import styles from './menu1.module.css'
import { useState, useRef } from 'react'

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

   const subMenuRef = useRef()

   function showSubMenu(subMenuItems = []) {
      setSubMenu({
         open: true,
         subMenuItems
      })
      subMenuRef.current.animate([{
         // transform: 'translateY(20px)',
         transform: 'scale(2)',
         opacity: 1
      }, {
         duration: 300,
         // fill: 'forwards'
      }])
   }

   function hideSubMenu() {
      setSubMenu({ ...initialSubMenu })
   }

   return (
      <div className={styles.menuContainer}>
         <div className={styles.labelsContainer}>
            {menuItems.map((item, i) =>
               <div className={styles.label} key={i} onMouseEnter={() => showSubMenu(item.children)}>
                  {item.label}
               </div>
            )}
         </div>
         <div className={styles.subMenuContainer} ref={subMenuRef}>
            {subMenu.subMenuItems.map((item, i) =>
               <div className={styles.subLabel} key={i}>
                  {item.label}
               </div>
            )}
         </div>
         <button onClick={hideSubMenu}>
            Hide sub menu
         </button>
      </div>
   )
}
