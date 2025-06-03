import React from 'react'
import AdminNavBar from './AdminNavBar'
import { Outlet } from 'react-router-dom'

const AdminIndex = () => {
  return (
    <div>
        <AdminNavBar></AdminNavBar>
        <Outlet/>
    </div>
  )
}

export default AdminIndex