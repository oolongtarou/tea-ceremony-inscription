import './App.css';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

import NavBar from './NavBar'
import WordCard from './domains/WordCard/WordCard'
import TabBar from './domains/TabBar/TagBar';

function App(){
  return (
      <div className='l-reverse'>
        <nav className='l-reverse__nav'>
          <NavBar/>
          <Divider sx={{height:'10px'}}/>
        </nav>
        <div className='l-reverse__body'>
          <nav className='l-reverse__localNav' style={{paddingLeft:'20px', paddingRight:'20px'}}>       
            <TabBar/>
            <List
              sx={{
                overflow:'auto',
                height: 715 // TODO：高さをヘッダー抜きで画面サイズいっぱいにしたい。
              }}
            >
              <WordCard/>
              <WordCard/>
              <WordCard/>
              <WordCard/>
              <WordCard/>
              <WordCard/>
              <WordCard/>
              <WordCard/>
              <WordCard/>
              <WordCard/>
            </List>
          </nav>
          <div className='c-box l-reverse__content'>
            content
          </div>
        </div>
      </div>
  )
}

export default App