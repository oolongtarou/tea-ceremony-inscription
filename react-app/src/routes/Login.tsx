import { Box, Button, TextField, Typography} from "@mui/material";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';

const Login = () => {
  return (
    <Card 
    sx={{
      p: 4,
      width: "400px",
      m: "20px auto"
    }}
    >
      {/* <Paper
        elevation={23}
        sx={{
          p: 4,
          width: "300px",
          m: "20px auto"
        }}
      > */}
        <TextField label="メールアドレス" variant="filled" fullWidth required />
        <TextField
          type="password"
          label="パスワード"
          variant="filled"
          fullWidth
          required
        />
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
  );
};


export default Login