import { useContext } from 'react';
import { observer } from "mobx-react";
import { Context } from "../index";
import { NavLink } from "react-router-dom";
import { authRoutes, publicRoutes, unAuthRouts } from "../routes";
import { NAV_ICONS } from "../consts/navbar";
import { useRoles } from '../hooks/useRoles';
import { Tooltip } from '@mui/material';

const Navbar = observer(() => {
    const { user } = useContext(Context)
    const [hasAdmin] = useRoles('admin')

    const unLogin = () => {
        localStorage.setItem('token', '')
        user.unLogin()
    }

    return (
        <>
            <header className={'flex z-auto justify-center items-center h-20 px-3 w-full text-xl font-normal'}>
                <nav className={'flex items-center justify-between w-full h-20 max-w-4xl'}>
                    <div className={'flex space-x-2'}>
                        {!user.isAuth && unAuthRouts.map(({ path, label }) => {
                            return (
                                <NavLink
                                    to={path}
                                    key={path}
                                    className={'hover:bg-gray-500 hover:box-border p-2 rounded-lg hover:text-white ease-in-out duration-300'}
                                >
                                    {label}
                                </NavLink>
                            )
                        })}
                        {hasAdmin && authRoutes.map(({ path, label }) => {
                            return (
                                <NavLink
                                    to={path}
                                    key={path}
                                    className={'hover:bg-gray-500 hover:box-border p-2 rounded-lg hover:text-white ease-in-out duration-300'}
                                >
                                    {label}
                                </NavLink>
                            )
                        })}
                        {publicRoutes.map(({ path, label }) => {
                            return (
                                <NavLink
                                    to={path}
                                    key={path}
                                    className={'hover:bg-gray-500 hover:box-border p-2 rounded-lg hover:text-white ease-in-out duration-300'}
                                >
                                    {label}
                                </NavLink>
                            )
                        })}
                    </div>
                    <span className={'flex space-x-2'}>
                        {NAV_ICONS.map(({ Icon, link, toolTip }, index) => {
                            return (
                                <Tooltip title={toolTip} key={index}>
                                    <a
                                        href={link}
                                        className={'hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:box-border p-2 rounded-lg hover:text-white ease-in-out duration-300'}
                                    >
                                        {<Icon size={25} />}
                                    </a>
                                </Tooltip>

                            )
                        })}
                        {user.isAuth &&
                            <span
                                onClick={unLogin}
                                className={'hover:bg-gray-500 hover:box-border p-2 rounded-lg hover:text-white ease-in-out duration-300'}>
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