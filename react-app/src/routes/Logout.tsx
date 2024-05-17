import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const clickHandler = () => {
        axios.get(`${import.meta.env.VITE_DOMAIN}/logout`, {withCredentials: true})
            .then((response) => {
                try{
                const result = response.data;
                console.log(result)
                navigate("/")
                } catch(error){
                console.error(`error:${error}`)
                }
            })
    }

    return (
        <>
            <button onClick={clickHandler}>ログアウト</button>
        </>
    )
}


export default Logout;