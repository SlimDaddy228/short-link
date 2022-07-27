import React, {useContext} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../consts/routes";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const handleFormSubmit = async(e: React.SyntheticEvent) => {
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

    return (
        <div
            className={'flex justify-center items-center'}
            style={{height: window.innerHeight - 80}} // 80 - height navbar
        >
            <div className='h-fit flex'>
                <div className='w-96 m-auto rounded-lg border border-gray-400 shadow-default py-10 px-16'>
                    <h1 className='text-2xl font-medium mt-4 mb-12 text-center'>
                        {`${isLogin ? 'Log in to your account' : 'Registration your account'}`}
                    </h1>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label htmlFor='email'>{`Email`}</label>
                            <input
                                type='email'
                                id='email'
                                className={`w-full p-2 border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                placeholder='Your Email'
                            />
                        </div>

                        <div>
                            <label htmlFor='password'>{`Password`}</label>
                            <input
                                type='password'
                                id='password'
                                className={`w-full p-2 border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                placeholder='Your Password'
                            />
                        </div>

                        <div className='flex justify-center items-center mt-6'>
                            <button
                                className={`bg-green-800 py-2 px-4 text-sm text-white rounded focus:outline-none`}
                            >
                                {isLogin ? 'Sign In' : 'Register'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
});

export default Auth;