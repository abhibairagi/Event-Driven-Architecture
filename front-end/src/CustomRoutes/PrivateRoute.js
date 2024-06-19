import { isAuthenticated } from "./index";
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    return(
        isAuthenticated() ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoute