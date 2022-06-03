/*
    Created by - Isuru Pathum Herath
    Name - Private Route
 */

import React from 'react';

import { Navigate, Outlet } from 'react-router-dom'
import { getStudentId } from './SessionManager';

const ProtectedRoutes = () => {

    //CHeck the user is logged in and redirect automatically
    const auth = getStudentId()
    return auth ? <Outlet /> : <Navigate to="/register" />
}

export default ProtectedRoutes;