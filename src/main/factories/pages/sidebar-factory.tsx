import React from 'react'
import Sidebar, { SidebarItem } from '@/presentation/components/sidebar/sidebar'

export const makeSidebar: React.FC = () => {

    const sidebarItems: SidebarItem[] = [
        { name: 'home', label: 'Home', path: '/' }
    ]
  return (
    <Sidebar
      items={sidebarItems}
    />
  )
}