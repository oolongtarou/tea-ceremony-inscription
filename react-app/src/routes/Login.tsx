import { Box, Button, InputAdornment, TextField, Typography} from "@mui/material";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import { useNavigate } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form"
import axios from 'axios';
import PasswordTextField from "../components/atoms/PasswordTextField";
import MailAddressTextField from "../components/atoms/MailAddressTextField";
import { useRef, useState } from "react";

interface IFormInput {
  mailAddress: string
  password: string
}

type LoginProps = {
  toggleLoginSignup: () => void
}

const Login: React.FC<LoginProps> = (props) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IFormInput>()
  const [passwordError, setPasswordError] = useState(false)
  const [passwordHelperText, setPasswordHelperText] = useState("")
  const [mailAddressError, setMailAddressError] = useState(false)
  const [mailAddressHelperText, setMailAddressHelperText] = useState("")

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const inputData = new FormData();
    inputData.append("mailAddress", data.mailAddress)
    inputData.append("password", data.password)
    axios.post(`${import.meta.env.VITE_DOMAIN}/login`, inputData, {withCredentials: true})
      .then((response) => {
        try{
          const success = response.data.data.success as boolean;
          if(!success) {
            // メールアドレス入力エラーの場合の処理
            const mailAddressErrorText = response.data.data.mailAddressErrorText as string
            if(mailAddressErrorText){
              setMailAddressError(true)
              setMailAddressHelperText(mailAddressErrorText)
            } else {
              setMailAddressError(false)
              setMailAddressHelperText("")
            }

            // パスワード入力エラーの場合の処理
            const passwordErrorText = response.data.data.passwordErrorText as string
            if(passwordErrorText){
              setPasswordError(true)
              setPasswordHelperText(passwordErrorText)
            } else{
              setPasswordError(false)
              setPasswordHelperText("")
            }
        
            return;
          }

          // 成功したらメイン画面にする。
          navigate("/App");
        } catch(error){
          console.error(`error:${error}`)
        }
      })
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 4, width: "400px", minHeight: "400px", m: "20px auto", }}>          
          <MailAddressTextField error={mailAddressError} helperText={mailAddressHelperText} formRegtiser={register("mailAddress")} />
          <PasswordTextField error={passwordError} helperText={passwordHelperText} formRegtiser={register("password")} />

          <Box mt={3}>
            <Button type="submit" color="primary" variant="contained" fullWidth sx={{fontSize: "1.1rem", marginBottom: "10px"}}>
              ログイン
            </Button>
            <Typography display="flex" justifyContent="flex-end">
              <Link to="#" style={{ textDecoration: "none", fontSize: "0.9rem"}}>パスワードを忘れた方はこちら</Link>
            </Typography>
            <Typography style={{ fontSize: "1.6rem", marginTop: "2rem"}}>
              <Link to='/App'>ログインせずにスタート</Link>
            </Typography>
            <Typography display="block" style={{fontSize: "1rem", marginTop: "2rem", color: "#939393"}}>
              アカウントをお持ちでない場合
              <a style={{display: "inline", cursor: "pointer", fontSize: "1.2rem", textDecoration: "underline"}} onClick={props.toggleLoginSignup}>&nbsp;登録はこちら</a>
            </Typography>
          </Box>
      </Card>
    </form>
  );
};


export default Login