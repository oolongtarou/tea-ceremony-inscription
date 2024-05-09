import * as React from 'react';
import Login from './Login';

function Top() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
};


    return (
        <div className="l-full">
            <div className="c-box l-full__content">
                <h1>茶の湯の銘 図鑑</h1>
                <Login />
            </div>
        </div>
    )
}

export default Top