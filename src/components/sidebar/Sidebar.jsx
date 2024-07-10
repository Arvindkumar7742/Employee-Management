import React, { useState } from 'react'
import { SidebarLink } from './SidebarLink';
export const sidebarLinks = [
  {
    id: 1,
    name: "Create Employee",
    path: "/dashboard/create-employee",
    icon: "VscAdd",
  },
  {
    id: 2,
    name: "Employee List",
    path: "/dashboard/get-all-employee",
    icon: "VscChecklist",
  },
];

export const Sidebar = () => {

  return (
    <div className='flex text-white flex-col gap-2 pt-[50px] bg-richblack-800 h-screen w-[15%]'>
      {
        sidebarLinks.map((item) => {
          return (
            <div key={item.id}>
              <SidebarLink name={item.name} path={item.path} icon={item.icon} />
            </div>
          )
        })
      }
    </div>
  )
}
