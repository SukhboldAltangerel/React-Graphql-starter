import React, { createContext, useState } from 'react'

const ThemeContext = createContext()

export function ThemeStore({children}) {
   const [theme, setTheme] = useState('light')

   return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
         {children}
      </ThemeContext.Provider>
   )
}

export default ThemeContext
