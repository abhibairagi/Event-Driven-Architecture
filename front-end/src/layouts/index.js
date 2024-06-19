import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import "../Components/myStyles.css"

const index = () => {
    return (
        <div className="main-container">
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default index