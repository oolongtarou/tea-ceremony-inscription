import { TextField} from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form"
import { ThemeProvider } from '@mui/material/styles';
import { MuiFormHelperTextTheme } from "./CustomTheme";

interface MailAddressFieldProps {
    formRegtiser: UseFormRegisterReturn<string>
    error: boolean
    helperText: string
}

export default function MailAddressTextField(props:MailAddressFieldProps) {
    return (
        <ThemeProvider theme={MuiFormHelperTextTheme}>
            <TextField 
            sx={{marginBottom: "30px"}}
            type= "text"
            label="メールアドレス" 
            variant="filled" 
            fullWidth 
            required 
            error={props.error}
            helperText={props.helperText}
            {...props.formRegtiser}
            />
        </ThemeProvider>
    )
}