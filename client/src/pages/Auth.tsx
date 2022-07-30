import React, { useContext, useMemo } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, MAIN_ROUTE } from "../consts/routes";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react";
import { Context } from "../index";
import InputForm, { FormInputData } from "../components/InputForm";

const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        };

        const email = target.email.value;
        const password = target.password.value;

        try {
            const data = isLogin ? await login(email, password) : await registration(email, password)
            user.setData(data)
            user.setIsAuth(true)
            navigate(MAIN_ROUTE)
        } catch (e: any) {
            alert(e.response.data[0] || e.response.data.message)
        }
    };

    const title: string = useMemo(() => isLogin ? 'Log in to your account' : 'Registration your account', [isLogin])
    const buttonLabel: string = useMemo(() => isLogin ? 'Sign In' : 'Register', [isLogin])
    const formData = useMemo((): Array<FormInputData> => [
        {
            id: 'email',
            label: 'Email',
            placeholder: 'qwerty@gmail.com',
            type: 'email',
        },
        {
            id: 'password',
            label: 'Password',
            placeholder: 'Must have at least 6 characters',
            type: 'password',
        }
    ], [])

    return (
        <div
            className={'flex justify-center items-center'}
            style={{ height: window.innerHeight - 80 }} // 80 - height navbar
        >
            <InputForm
                formData={formData}
                onSubmit={onSubmit}
                title={title}
                buttonLabel={buttonLabel}
            />
        </div>
    );
});

export default Auth;