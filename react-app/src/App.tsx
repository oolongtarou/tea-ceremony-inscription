import './App.css';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import axios from 'axios';

import NavBar from './NavBar'
import WordCard from './domains/WordCard/WordCard'
import TagBar from './domains/TabBar/TagBar';
import WordContent from './domains/WordContent/WordContent';
import React, { useRef } from 'react';
import { WordCardEntity } from './domains/WordCard/WordCardEntity';
import { ToWordCards } from './domains/Converter/Converter';
import SearchBox from './domains/SearchBox';



function App(){

  // TODo:初期値の代入がマジックナンバーなので直す。
  const selectedMonthRef = useRef<number>(-1);
  const selectedTagRef = useRef<number>(0);
  const searchWordRef = useRef<string>("");
  const [wordCards, setWordCards] = React.useState<WordCardEntity[]>([]);

  const [selectedWordId, setSelectedWordId] = React.useState<number | null>(null);
  const handleSelectWord = (id: number) => {
    setSelectedWordId(id);
  };

  const updateWordCards = () => {
    const titleQueryParam:string = searchWordRef.current != "" ? `title=${searchWordRef.current}` : "";
    const pronunciationQueryParam:string = searchWordRef.current != "" ? `pronunciation=${searchWordRef.current}` : "";
    const monthQueryParam:string = selectedMonthRef.current >= 0 ? `month=${selectedMonthRef.current}` : "";
    const tagQueryParam:string = selectedTagRef.current > 0 ? `tag-id=${selectedTagRef.current}` : "";
    const allQueryParams:string[] = [titleQueryParam, pronunciationQueryParam, monthQueryParam, tagQueryParam];

    const inputQueryParam:string[] = allQueryParams.filter(x => x != "")

    const endpoint = inputQueryParam.length > 0
      ? `${import.meta.env.VITE_DOMAIN}/words-info?${inputQueryParam.join("&")}`
      : `${import.meta.env.VITE_DOMAIN}/words-info`;

    console.log(`endpoint:${endpoint}`)
      axios.get(endpoint).then((response) => {
        try{
          console.log(response.data.data)
          const converted = ToWordCards(response.data.data);
          setWordCards(converted);
        } catch(error){
          console.error(`error:${error}`)
        }
      })
  }
  React.useEffect(() => updateWordCards, []);

  return (
      <div className='l-reverse'>
        <nav className='l-reverse__nav'>
          <NavBar action={updateWordCards} selectedMonthRef={selectedMonthRef} />
          <Divider sx={{height:'10px'}}/>
        </nav>
        <div className='l-reverse__body'>
          <nav className='l-reverse__localNav' style={{paddingLeft:'20px', paddingRight:'20px'}}>
            <TagBar action={updateWordCards} selectedTagRef={selectedTagRef} />
            <SearchBox searchWordRef={searchWordRef} action={updateWordCards} />
            <List
              sx={{
                overflow:'auto',
                height: 715 // TODO：高さをヘッダー抜きで画面サイズいっぱいにしたい。
              }}
            >
              {wordCards.map((wordCard, index) => (
                <WordCard key={index} wordCard={wordCard} selectWordAction={handleSelectWord} />
              ))}
            </List>
          </nav>
          {/* TODO: ↓ここのDivider(縦線はもっとうまい実装方法があるはず) */}
          <Divider orientation='vertical' sx={{height:'100vh', marginTop:'-10px'}}/>
          <div className='c-box l-reverse__content'>
            <WordContent selectedWordId={selectedWordId || 0}/>
          </div>
        </div>
      </div>
  )
}

export default App