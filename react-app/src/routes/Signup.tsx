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

type SignupProps = {
    toggleLoginSignup: () => void
}

const Signup: React.FC<SignupProps> = (props) => {
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
              登録してログイン
            </Button>
          </Box>
          <Button onClick={props.toggleLoginSignup} color="secondary" variant="contained" fullWidth>
              ログインに戻る
            </Button>
      </Card>
    </form>
  );
};


export default Signup