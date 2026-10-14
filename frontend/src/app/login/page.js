import React from 'react'
import Login from '@/components/Auth/Login'

export const metadata = {
  title: "Sign In | Big Bear Vans",
  robots: { index: false, follow: false },
};

export default function page() {
  return (
    <div>
<Login />
    </div>
  )
}
