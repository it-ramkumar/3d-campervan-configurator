import React, { Suspense } from 'react'
import Dashboard from '@/components/Dashboard/Dashboard'
import { PrivateRoute } from '@/components/PrivateComponent/PrivateComponent';

export const metadata = {
  title: "Dashboard | Big Bear Vans",
  robots: { index: false, follow: false },
};

export default function page() {
    return (
        <PrivateRoute>
            <div>
                <Suspense fallback={null}>
                    <Dashboard />
                </Suspense>
            </div>
        </PrivateRoute>
    )
}
