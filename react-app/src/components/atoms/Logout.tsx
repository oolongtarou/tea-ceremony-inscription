import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

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
        // }
    }

    return (
        <>
            <Button color="inherit" variant="text" style={{cursor:"pointer"}} onClick={clickHandler}>ログアウト</Button>
        </>
    )
}


export default Logout;