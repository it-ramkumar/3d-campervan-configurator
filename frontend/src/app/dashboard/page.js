import React from 'react'
import Dashboard from '@/components/Dashboard/Dashboard'
import { PrivateRoute } from '@/components/PrivateComponent/PrivateComponent';

export default function page() {
    return (
        <PrivateRoute>
            <div>
                <Dashboard />
            </div>
        </PrivateRoute>
    )
}
