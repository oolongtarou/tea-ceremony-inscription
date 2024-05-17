import {  IconButton, InputAdornment, TextField} from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form"

interface MailAddressFieldProps {
    formRegtiser: UseFormRegisterReturn<string>
}

export default function MailAddressTextField(props:MailAddressFieldProps) {
    return (
        <TextField 
        type= "text"
        label="メールアドレス" 
        variant="filled" 
        fullWidth 
        required 
        {...props.formRegtiser}
        />
    )
}