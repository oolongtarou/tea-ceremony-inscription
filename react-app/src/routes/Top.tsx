import * as React from 'react';
import { useRef } from 'react';


import Login from './Login';
import Signup from './Signup';


function Top() {
    // const [showPassword, setShowPassword] = React.useState(false);
    // const handleClickShowPassword = () => setShowPassword((show) => !show);

    const loginRef = React.useRef();
    const [showLogin, setShowLogin] = React.useState(true);

    const toggleLoginSignup = () => {
        setShowLogin(!showLogin)
    }

    return (
        <div className="l-full">
            <div className="c-box l-full__content">
                <h1>茶の湯の銘 図鑑</h1>
                {showLogin ? <Login toggleLoginSignup={toggleLoginSignup} /> : <Signup toggleLoginSignup={toggleLoginSignup} />}
            </div>
        </div>
    )
}

export default Top