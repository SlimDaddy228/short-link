import React, {useContext} from 'react';
import {Context} from "../index";

const Admin = () => {
    const {user} = useContext(Context)
    return (
        <div>
            {`Admin`}
        </div>
    );
};

export default Admin;