import * as React from 'react';
import { useRef } from 'react';

import Login from '../components/organisms/Login';
import Signup from '../components/organisms/Signup';

function Top() {
    const loginRef = React.useRef();
    const [showLogin, setShowLogin] = React.useState(true);

    const toggleLoginSignup = () => {
        setShowLogin(!showLogin)
    }

    return (
        <div className="l-full">
            <div className="c-box l-full__content">
                <h1>茶の湯の銘 図鑑</h1>
                {showLogin 
                    ? <Login toggleLoginSignup={toggleLoginSignup} /> 
                    : <Signup toggleLoginSignup={toggleLoginSignup} />
                }
            </div>
        </div>
    )
}

export default Top