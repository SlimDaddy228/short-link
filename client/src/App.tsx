import { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react";
import { Context } from "./index";
import { check } from "./http/userAPI";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import CircleLoader from "./components/CircleLoader";

const App = observer(() => {
    const { user } = useContext(Context)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        check().then(data => {
            user.setData(data)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [user])

    if (loading) {
        return <CircleLoader />
    }

    return (
        <div style={{width: '100vw', height: '100vh'}} className={'dark:text-white'}>
            <BrowserRouter>
                <Navbar />
                <AppRouter />
            </BrowserRouter>
        </div>

    )
});

export default App;
