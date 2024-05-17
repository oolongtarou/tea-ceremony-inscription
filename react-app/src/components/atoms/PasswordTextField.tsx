import {  IconButton, InputAdornment, TextField} from "@mui/material";

import { UseFormRegisterReturn } from "react-hook-form"
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { MuiFormHelperTextTheme } from "./CustomTheme";


interface PasswordFieldProps {
    formRegtiser: UseFormRegisterReturn<string>
    error: boolean
    helperText: string
}

export default function PasswordTextField(props:PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false)
    function handleClickShowPassword() {
        setShowPassword(!(showPassword))
    }
    
    return (
        <ThemeProvider theme={MuiFormHelperTextTheme}>
            <TextField 
            sx={{marginBottom: "30px"}}
            type={showPassword ? 'text' : 'password'}
            label="パスワード" 
            variant="filled" 
            fullWidth 
            error={props.error}
            helperText={props.helperText}
            InputProps={{
                endAdornment: 
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </InputAdornment>,
            }} 
            required 
            {...props.formRegtiser}
            />
        </ThemeProvider>
    )
}