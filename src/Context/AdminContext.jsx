/* eslint-disable */
import React, { createContext, useContext, useState } from 'react'

export const AdminContext = createContext()

 export const AdminProvider = ({children}) => {

    const [searchInput, setSearchInput] = useState('')
    const [showEdit, setShowEdit] = useState(false)
    const [selectedPaper, setSelectedPaper] = useState(null);
    
    const value = {
        searchInput,
        setSearchInput,
        showEdit,
        setShowEdit,
        selectedPaper,
        setSelectedPaper
    }

  return (
    <AdminContext.Provider value={value}>
        {children}
    </AdminContext.Provider>
  )
}


export default AdminProvider