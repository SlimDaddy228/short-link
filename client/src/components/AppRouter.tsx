import { useCallback, useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router'
import { authRoutes, publicRoutes, unAuthRouts } from "../routes";
import { Navigate, useLocation } from "react-router-dom";
import { Context } from "../index";
import { observer } from "mobx-react";
import { APPLICATION_ROUTES, MAIN_ROUTE } from "../consts/routes";
import { getRedirectLink } from "../http/linksAPI";

const AppRouter = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()

    const redirectToLink = useCallback(async () => {
        const path = location.pathname
        const isRedirectLink = path.indexOf(APPLICATION_ROUTES) === -1;
        if (isRedirectLink && path !== MAIN_ROUTE) {
            try {
                const cutLocation = path.slice(1)
                const redirectLink = await getRedirectLink(cutLocation)
                window.location.replace(redirectLink)
            } catch (e: any) {
                alert(e.response.data.message)
            }
        }
    }, [location.pathname])

    useEffect(() => {
        redirectToLink()
    }, [redirectToLink])

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