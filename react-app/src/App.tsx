import './App.css';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import NavBar from './NavBar'
import WordCard from './domains/WordCard/WordCard'
import TabBar from './domains/TabBar/TagBar';
import WordContent from './domains/WordContent/WordContent';
import React from 'react';
import { WordCardEntity } from './domains/WordCard/WordCardEntity';
import { ToWordCards } from './domains/Converter/Converter';

function App(){
  const [wordCards, setWordCards] = React.useState<WordCardEntity[]>([]);
  React.useEffect(() => {
    const endpoint = `${import.meta.env.VITE_DOMAIN}/words-info`;
    console.log(`endpoint:${endpoint}`)
    axios.get(endpoint).then((response) => {
      try{
        const converted = ToWordCards(response.data.data);
        console.log(converted);
        setWordCards(converted);
      } catch(error){
        console.error(`error:${error}`)
      }
    })    
  }, []);

  return (
      <div className='l-reverse'>
        <nav className='l-reverse__nav'>
          <NavBar/>
          <Divider sx={{height:'10px'}}/>
        </nav>
        <div className='l-reverse__body'>
          <nav className='l-reverse__localNav' style={{paddingLeft:'20px', paddingRight:'20px'}}>       
            <TabBar/>
            <TextField fullWidth label='検索' variant='filled' style={{ marginTop:'10px', marginBottom:'10px'}}/>
            <List
              sx={{
                overflow:'auto',
                height: 715 // TODO：高さをヘッダー抜きで画面サイズいっぱいにしたい。
              }}
            >
              {/* {wordCards.map((wordCard) => )} */}
              {/* <WordCard/> */}
              {wordCards.map((wordCard, index) => (
                <WordCard key={index} {...wordCard} />
              ))}
            </List>
          </nav>
          {/* TODO: ↓ここのDivider(縦線はもっとうまい実装方法があるはず) */}
          <Divider orientation='vertical' sx={{height:'100vh', marginTop:'-10px'}}/>
          <div className='c-box l-reverse__content'>
            <WordContent/>
          </div>
        </div>
      </div>
  )
}

export default App