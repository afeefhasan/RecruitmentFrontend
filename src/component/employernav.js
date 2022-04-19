import React from 'react';
import logo from  '../images/logo.png';
import { NavLink } from 'react-router-dom';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline'

import LogoutIcon from '@mui/icons-material/Logout';
export default function HomeNav() {
  return (
    <Popover className="relative top-0 z-3 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 z-2 bg-gradient-to-r from-indigo-300 ...">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <div >
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-10"
                src={logo}
                alt="logo"
              />
            </div>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex gap-6 items-center justify-end md:flex-1 lg:w-0">
          <NavLink to="/employerhome" className="mx-5  whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
            Home
            </NavLink>
            <NavLink to="/employerjob" className=" mx-5 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
            Jobs
            </NavLink>
            <NavLink to="/" className="mx-5 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
            <Tooltip title="Logout" arrow>
                <LogoutIcon />
            </Tooltip>
            </NavLink>
            
            
          </div>
        </div>
      </div>
       <Transition
       as={Fragment}
       enter="duration-200 ease-out"
       enterFrom="opacity-0 scale-95"
       enterTo="opacity-100 scale-100"
       leave="duration-100 ease-in"
       leaveFrom="opacity-100 scale-100"
       leaveTo="opacity-0 scale-95"
     >
       <Popover.Panel focus className="absolute z-3 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
         <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
           <div className="pt-5 pb-6 px-5">
             <div className="flex items-center justify-between">
               <div>
                 <img
                   className="h-8 w-auto"
                   src={logo}
                   alt="Workflow"
                 />
               </div>
               <div className="-mr-2">
                 <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                   <span className="sr-only">Close menu</span>
                   <XIcon className="h-6 w-6" aria-hidden="true" />
                 </Popover.Button>
               </div>
             </div>
             
           </div>
           <div className="py-6 px-5 space-y-6 z-3 ">
             <div>
               <NavLink
                to="/employerhome"
                 className="w-full   px-4 py-2 border border-transparent  shadow-sm text-base font-medium "
               >
                 Home
               </NavLink>
               <NavLink
                to="/employerjob"
                 className="w-full  px-4 py-2 border border-transparent  shadow-sm text-base font-medium "
               >
                 Jobs
               </NavLink>
               <NavLink
                to="/"
                 className="w-full  px-4 py-2 border border-transparent  shadow-sm text-base font-medium "
               >
                 Logout
               </NavLink>
             </div>
           </div>
         </div>
       </Popover.Panel>
     </Transition>
     </Popover>
  )
}
