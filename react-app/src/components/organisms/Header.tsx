import Logout from '../../routes/Logout';
import TryIcon from '@mui/icons-material/Try';
import StarIcon from '@mui/icons-material/Star';
import { useCookies ,CookiesProvider } from 'react-cookie';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export default function Header() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['tea_ins_session']);
  console.log("cookies.userId:" + cookies.tea_ins_session)
  return (
    <CookiesProvider>
      <div style={{  maxHeight: "35px", display:"flex", padding:"0px 16px", justifyContent:"space-between" }}>
          <h1 style={{fontSize: "1.5rem", color:"#36540f", margin:"0px", lineHeight: "35px" }}>茶の湯の名図鑑</h1>
          <div style={{lineHeight:"35px", fontSize: "1.2rem", color:"#666666"}}>
              {!cookies.tea_ins_session 
                ? <Button variant='text' color='inherit' onClick={() => navigate("/")}>ログイン</Button> 
                : <Logout />}
              <Button color='inherit' variant='text' style={{marginLeft: "20px"}}>お気に入り一覧</Button>
              <Button color='inherit' variant='text' style={{marginLeft: "20px"}}>今日のおすすめ</Button>
              {/* <StarIcon fontSize='large' />
              <TryIcon fontSize='large' /> */}
          </div>
      </div>
    </CookiesProvider>
  );
}