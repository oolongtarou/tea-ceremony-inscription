import { Routes, Route, Link } from "react-router-dom";

function Login() {
    return (
        <div className="l-full">
            <div className="c-box l-full__content">
                <h1>茶の湯の銘 図鑑</h1>
                <Link to='/App'
                    style={{
                        fontSize:'3em',
                        color:'white'
                    }}
                >
                    スタート
                    </Link>
            </div>
        </div>
    )
}

export default Login