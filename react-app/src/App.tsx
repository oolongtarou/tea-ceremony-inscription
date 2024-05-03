import './App.css';
import Divider from '@mui/material/Divider';
import NavBar from './NavBar'
import WordCard from './domains/WordCard/WordCard'

// import List from '@mui/material/List';

function App(){
  return (
      <div className='l-reverse'>
        <nav className='l-reverse__nav'>
          <NavBar/>
          <Divider sx={{height:'10px'}}/>
        </nav>
        <div className='l-reverse__body'>
          <nav className='l-reverse__localNav' style={{paddingLeft:'20px', paddingRight:'20px'}}>
            <h2>localNav</h2>
            {/* <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
      }}
    >
    </List> */}
            <WordCard/>
            <WordCard/>
            <WordCard/>
            <WordCard/>
            <WordCard/>
            <WordCard/>
            <WordCard/>
            <WordCard/>
            <WordCard/>
          </nav>
          <Divider orientation='vertical'/>
          <div className='c-box l-reverse__content'>
            content
          </div>
        </div>
      </div>
  )
}

export default App