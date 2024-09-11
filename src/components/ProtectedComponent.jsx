import React, { useContext } from 'react';
import { GlobalStateContext } from '../Context/GlobalState';
import { Navigate, Outlet, Route } from 'react-router-dom';

const ProtectedComponent = () => {
    const { user,loading } = useContext(GlobalStateContext)
    console.log('User:', user);
    console.log('Loading:', loading);

    if (loading || user === undefined) { // Check for both loading and undefined user
        return <div>Loading...</div>;
    }

    if (user?.is_staff) {
        return <Outlet />;  // Render the child routes for the protected component
    }

    // Redirect to login if no valid user is found
    return <Navigate to="/login" replace />
}

export default ProtectedComponent;
