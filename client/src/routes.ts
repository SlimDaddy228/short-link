import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import CreateLink from "./pages/CreateLink";
import Main from "./pages/Main";
import {
    ADMIN_ROUTE,
    CREATE_LINK_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE
} from "./consts/routes";

export const authRoutes = [
    {
        label: 'Admin',
        path: ADMIN_ROUTE,
        Component: Admin
    },
]

export const unAuthRouts = [
    {
        label: 'Sign In',
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        label: 'Register',
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]

export const publicRoutes = [
    {
        label: 'Create Link',
        path: CREATE_LINK_ROUTE,
        Component: CreateLink,
    },
    {
        label: 'Main',
        path: MAIN_ROUTE,
        Component: Main,
    }
]