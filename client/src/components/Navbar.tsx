import {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react";
import {Context} from "../index";
import {NavLink} from "react-router-dom";
import {authRoutes, publicRoutes, unAuthRouts} from "../routes";
import {NAV_ICONS} from "../consts/navbar";
import {useRoles} from '../hooks/useRoles';
import {Tooltip} from '@mui/material';
import {MdDarkMode} from "react-icons/md";
import {BsSun} from "react-icons/bs";

const Navbar = observer(() => {
    const {user} = useContext(Context)
    const [isDarkMode, setDarkMode] = useState<boolean>(false)
    const [hasAdmin] = useRoles('admin')
    const DarkModeIcon = isDarkMode ? MdDarkMode : BsSun

    const unLogin = () => {
        localStorage.setItem('token', '')
        user.unLogin()
    }

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => {
            localStorage.setItem('theme', !prevMode ? 'dark' : 'light')
            return !prevMode
        })
    }

    useEffect(() => {
        const themeIsDark = localStorage.getItem('theme') === 'dark'
        if (themeIsDark) {
            document.documentElement.classList.remove('light')
            document.documentElement.classList.add('dark')
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.documentElement.classList.remove('dark')
            document.documentElement.classList.add('light')
            document.documentElement.style.colorScheme = 'light';
        }
        setDarkMode(themeIsDark)
    }, [isDarkMode])

    return (
        <>
            <header className={'flex z-auto justify-center items-center h-20 px-3 w-full text-sm font-normal'}>
                <nav className={'flex items-center justify-between w-full h-20 max-w-4xl'}>
                    <div className={'flex space-x-2'}>
                        {!user.isAuth && unAuthRouts.map(({path, label}) => {
                            return (
                                <NavLink
                                    to={path}
                                    key={path}
                                    className={'hover:bg-gray-600 hover:box-border p-2 rounded-lg hover:text-white ease-in-out duration-300'}
                                >
                                    {label}
                                </NavLink>
                            )
                        })}
                        {hasAdmin && authRoutes.map(({path, label}) => {
                            return (
                                <NavLink
                                    to={path}
                                    key={path}
                                    className={'hover:bg-gray-600 hover:box-border p-2 rounded-lg hover:text-white ease-in-out duration-300'}
                                >
                                    {label}
                                </NavLink>
                            )
                        })}
                        {publicRoutes.map(({path, label}) => {
                            return (
                                <NavLink
                                    to={path}
                                    key={path}
                                    className={'hover:bg-gray-600 hover:box-border p-2 rounded-lg hover:text-white ease-in-out duration-300'}
                                >
                                    {label}
                                </NavLink>
                            )
                        })}
                    </div>
                    <span className={'flex space-x-2'}>
                        {NAV_ICONS.map(({Icon, link, toolTip}, index) => {
                            return (
                                <Tooltip title={toolTip} key={index}>
                                    <a
                                        href={link}
                                        className={'hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:box-border p-2 rounded-lg hover:text-white ease-in-out duration-300'}
                                    >
                                        {<Icon size={25}/>}
                                    </a>
                                </Tooltip>
                            )
                        })}
                        <Tooltip title={'Toggle Dark Mode'}>
                            <div
                                onClick={toggleDarkMode}
                                className={'hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:box-border p-2 rounded-lg hover:text-white ease-in-out duration-300 cursor-pointer'}
                            >
                                <DarkModeIcon size={25}/>
                            </div>

                        </Tooltip>
                        {user.isAuth &&
                            <span
                                onClick={unLogin}
                                className={'hover:bg-gray-500 hover:box-border p-2 rounded-lg hover:text-white ease-in-out duration-300 cursor-pointer'}>
                                {`Sign out`}
                            </span>
                        }
                    </span>
                </nav>
            </header>
        </>
    );
});

export default Navbar;