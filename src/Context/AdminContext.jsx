/* eslint-disable */
import React, { createContext, useContext, useState } from 'react'

export const AdminContext = createContext()

 export const AdminProvider = ({children}) => {

    const [searchInput, setSearchInput] = useState('')
    
    const value = {
        searchInput,
        setSearchInput
    }

  return (
    <AdminContext.Provider value={value}>
        {children}
    </AdminContext.Provider>
  )
}


export default AdminProvider