import React from 'react'
import Sidebar, { SidebarItem } from '@/presentation/components/sidebar/sidebar'

export const makeSidebar: React.FC = () => {

    const sidebarItems: SidebarItem[] = [
        { name: 'home', label: 'Home', path: '/' },
        { name: 'task', label: 'Tasks', path: '/task' },
        { name: 'customer', label: 'Customer', path: '/customer' }
    ]
  return (
    <Sidebar
      items={sidebarItems}
    />
  )
}