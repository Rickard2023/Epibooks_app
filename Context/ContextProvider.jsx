import React, { createContext, useState } from 'react'

export const Context = createContext(null);


export default function ContextProvider({children}) {

  const [ticks, setTicks] = useState(['','','','','']);
  const [searchText, setSearchText] = useState('');

  return (
    <Context.Provider
      value = {
        {
          ticks, 
          setTicks,
          searchText,
          setSearchText
        }
      }
    >

      {children}
    </Context.Provider>
  )
}
