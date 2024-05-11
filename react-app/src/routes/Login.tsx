import { Box, Button, TextField, Typography} from "@mui/material";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import { useNavigate } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form"
import axios from 'axios';


interface IFormInput {
  mailAddress: string
  password: string
}

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const inputData = new FormData();
    inputData.append("mailAddress", data.mailAddress)
    inputData.append("password", data.password)
    axios.post(`${import.meta.env.VITE_DOMAIN}/login`, inputData, {withCredentials: true})
      .then((response) => {
        try{
          const result = response.data;
          const status = result.status;
          if(status == "NG") {
            navigate("/")
            return;
          }
          console.log(result)
          navigate("/App");
        } catch(error){
        console.error(`error:${error}`)
        }
      })
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 4, width: "400px", m: "20px auto" }}>
          <TextField label="メールアドレス" variant="filled" fullWidth required {...register("mailAddress")} />
          <TextField type="password" label="パスワード" variant="filled" fullWidth required {...register("password")} />
          <Box mt={3}>
            <Button type="submit" color="primary" variant="contained" fullWidth>
              ログイン
            </Button>
              <Link to="#">パスワードを忘れた方はこちら</Link>
            <Typography>
              <Link to='/App'>ログインせずにスタート</Link>
            </Typography>
            <Typography variant="caption" display="block">
              アカウントをお持ちでない場合
              <Link to="#"> 登録はこちら</Link>
            </Typography>
          </Box>
      </Card>
    </form>
  );
};


export default Login