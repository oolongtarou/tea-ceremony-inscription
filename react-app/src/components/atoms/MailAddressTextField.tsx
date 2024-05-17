import {  IconButton, InputAdornment, TextField} from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form"

interface MailAddressFieldProps {
    formRegtiser: UseFormRegisterReturn<string>
    error: boolean
    helperText: string
}

export default function MailAddressTextField(props:MailAddressFieldProps) {
    return (
        <TextField 
        type= "text"
        label="メールアドレス" 
        variant="filled" 
        fullWidth 
        required 
        error={props.error}
        helperText={props.helperText}
        {...props.formRegtiser}
        />
    )
}