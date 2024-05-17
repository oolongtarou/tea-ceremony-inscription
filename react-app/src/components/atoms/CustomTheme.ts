import { createTheme } from '@mui/material/styles';

export const MuiFormHelperTextTheme = createTheme(
    {
        components: {
            MuiFormHelperText: {
                styleOverrides: {
                root: {
                    marginTop: 0,
                    height: 0,
                }
            }
        }
    }
})