import { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router'
import { authRoutes, publicRoutes, unAuthRouts } from "../routes";
import { Navigate, useLocation } from "react-router-dom";
import { Context } from "../index";
import { observer } from "mobx-react";
import { MAIN_ROUTE } from "../consts/routes";
import { getRedirectLink } from "../http/linksAPI";

const AppRouter = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()

    useEffect(() => {
        if (location.pathname !== MAIN_ROUTE) {
            const cutLocation = location.pathname.slice(1)
            getRedirectLink(cutLocation).then(data => {
                window.location.replace(data.redirectLink)
            })
        }
    }, [location])

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Component }) => {
                return (
                    <Route key={path} path={path} element={<Component />} />
                )
            })}
            {!user.isAuth && unAuthRouts.map(({ path, Component }) => {
                return (
                    <Route key={path} path={path} element={<Component />} />
                )
            })}
            {publicRoutes.map(({ path, Component }) => {
                return (
                    <Route key={path} path={path} element={<Component />} />
                )
            })}
            <Route
                path="*"
                element={<Navigate to={MAIN_ROUTE} replace />}
            />
        </Routes>
    );
});

export default AppRouter;