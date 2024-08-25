import React, { useContext } from 'react';
import { GlobalStateContext } from '../Context/GlobalState';
import { Navigate, Outlet, Route } from 'react-router-dom';

const ProtectedComponent = () => {
    const { user,loading } = useContext(GlobalStateContext)
    console.log(user)

    if (loading) {
        
        return <div>Loading...</div>;
    }
    if (user && user.is_staff) {
        return <Outlet />;  // Render the child routes
    } else {
        return <Navigate to="/login" replace />;
    }
}

export default ProtectedComponent;
