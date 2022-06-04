import React from 'react';

import { Navigate, Outlet } from 'react-router-dom'
import { getStudentId, getUser } from '../SessionManager';

const ProtectedRoutes = () => {

    const auth = getUser();
    return auth ? <Outlet /> : <Navigate to="/admin/login" />
}

export default ProtectedRoutes;