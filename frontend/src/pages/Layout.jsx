import React from 'react'
import LayoutCom from '../components/layout/Layout'
import BlackFridayLabel from '../websiteComponents/components/BlackFriday/BlackFriday'


export default function Layout() {
  return (
    <div className=''>
      <BlackFridayLabel/>
        <LayoutCom />
    </div>
  )
}
