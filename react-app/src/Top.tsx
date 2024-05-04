import { Routes, Route, Link } from "react-router-dom";

import Newtop from './New'

function Top() {
    return (
        <div className="l-full">
            <div className="c-box l-full__content">
                <h1>content</h1>
                <Link to='/App'>ログインせずにスタート</Link>
            </div>
        </div>
    )
}

export default Top