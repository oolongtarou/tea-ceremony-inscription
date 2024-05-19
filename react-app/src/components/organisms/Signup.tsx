import { Box, Button, TextField, Typography} from "@mui/material";
import Card from '@mui/material/Card';
import { useNavigate } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form"
import axios from 'axios';
import MailAddressTextField from "../atoms/MailAddressTextField";
import PasswordTextField from "../atoms/PasswordTextField";
import { useState } from "react";

interface IFormInput {
  mailAddress: string
  password: string
}

type SignupProps = {
    toggleLoginSignup: () => void
}

const mailAddressRegex = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/g
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d-_]{14,32}$/g;

const Signup: React.FC<SignupProps> = (props) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IFormInput>()
  const [passwordError, setPasswordError] = useState(false)
  const [passwordHelperText, setPasswordHelperText] = useState("")
  const [mailAddressError, setMailAddressError] = useState(false)
  const [mailAddressHelperText, setMailAddressHelperText] = useState("")
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const inputData = new FormData()
    const mailAddress = data.mailAddress
    const password = data.password
    inputData.append("mailAddress", mailAddress)
    inputData.append("password", password)

    if (!isValidMailAddress(mailAddress)) {
      setMailAddressError(true)
      setMailAddressHelperText("有効なメールアドレスではありません。")
      return
    }
    else {
      setMailAddressError(false)
      setMailAddressHelperText("")
    }

    if(!isValidPassword(password)){
      setPasswordError(true)
      setPasswordHelperText("有効なパスワードではありません。")
      return
    }
    else{
      setPasswordError(false)
      setPasswordHelperText("")
    }

    axios.post(`${import.meta.env.VITE_DOMAIN}/signup`, inputData, {withCredentials: true})
      .then((response) => {
        try{
          const signupSuccess = response.data.data.success as boolean;
          console.log("signup:" + signupSuccess)
          if(signupSuccess){
            axios.post(`${import.meta.env.VITE_DOMAIN}/login`, inputData, {withCredentials: true})
            .then((response) => {
              try{
                const loginSuccess = response.data.data.success as boolean;
                console.log("login:" + loginSuccess)
                if(!loginSuccess) {
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
          } else {
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
      <Card sx={{ p: 4, width: "400px", minHeight: "400px", m: "20px auto" }}>
          <MailAddressTextField error={mailAddressError} helperText={mailAddressHelperText} formRegtiser={register("mailAddress")} />
          <PasswordTextField error={passwordError} helperText={passwordHelperText} formRegtiser={register("password")} />
          <Typography display="flex" justifyContent="flex-end" sx={{color:"#909090"}}>※ 半角英数字12字以上32字以内</Typography>
          <Box mt={3}>
            <Button type="submit" color="primary" variant="contained" fullWidth sx={{fontSize: "1.1rem" }}>
              登録してログイン
            </Button>
          </Box>
          <Button style={{marginTop: "100px"}} onClick={props.toggleLoginSignup} color="inherit" variant="contained" fullWidth>
              ログイン画面に戻る
            </Button>
      </Card>
    </form>
  );
};


export default Signup



function isValidMailAddress(mailAddress: string): boolean {
  const result = mailAddressRegex.test(mailAddress)
  return result
}

function isValidPassword(password: string): boolean {
  const result = passwordRegex.test(password)
  return result
}