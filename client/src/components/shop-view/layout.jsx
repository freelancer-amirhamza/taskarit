import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'

const Layout = () => {
  return (
    <div className="flex flex-col overflow-hidden  ">
        <Header/>
        <div className="flex flex-col w-full">
          <Outlet/>
        </div>
        
    </div>
  )
}

export default Layout