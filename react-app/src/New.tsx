import { Routes, Route, Link } from "react-router-dom";

import Top from './Top';

function Newtop() {
    return (
        <>
            <div>NewTopですよ</div>
            <Link to='/'>トップに戻ります。</Link>
        </>
    )
}

export default Newtop