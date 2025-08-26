import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as GrIcons from 'react-icons/gr';
import * as MdIcons from 'react-icons/md';
import * as CgIcons from 'react-icons/cg';
export const NavBarData = [
    {
        title:'Home',
        path:'/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-home'
    },
    {
        title:'Dining',
        path:'/dining',
        icon: <MdIcons.MdLocalDining/>,
        cName: 'nav-dining'
    },
    {
        title:'Resources',
        path:'/resources',
        icon: <GrIcons.GrResources/>,
        cName: 'nav-resources'
    },
    {
        title:'Transportation',
        path:'/transportation',
        icon: <FaIcons.FaBus/>,
        cName: 'nav-transport'
    }
    // {
    //     title:'Blogs',
    //     path:'/blogs',
    //     icon: <FaIcons.FaBookReader/>,
    //     cName: 'nav-blogs'
    // },
    // {
    //     title:'Profile',
    //     path:'/profile',
    //     icon: <CgIcons.CgProfile/>,
    //     cName: 'nav-prof'
    // }
]
