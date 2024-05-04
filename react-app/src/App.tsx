import './App.css';
import Divider from '@mui/material/Divider';
import axios from 'axios';

import { Routes, Route } from "react-router-dom"; // 追加

import NavBar from './NavBar'
import TagBar from './domains/TabBar/TagBar';
import WordContent from './domains/WordContent/WordContent';
import React, { SetStateAction, useRef } from 'react';
import { WordCardEntity } from './domains/WordCard/WordCardEntity';
import { ToWordCards } from './domains/Converter/Converter';
import SearchBox from './domains/SearchBox';
import WordCardBar from './domains/WordCard/WordCardBar';



function App(){
  // TODo:初期値の代入がマジックナンバーなので直す。
  const selectedMonthRef = useRef<number>(-1);
  const selectedTagRef = useRef<number>(0);
  const searchWordRef = useRef<string>("");
  const [wordCards, setWordCards] = React.useState<WordCardEntity[]>([]);

  const [another, setAnother] = React.useState(true);

  const [selectedWordId, setSelectedWordId] = React.useState<number | null>(null);
  const handleSelectWord = (id: number) => {
    setSelectedWordId(id);
  };
  let titleQueryParam:string = getQueryParamTitle(searchWordRef);
  let pronunciationQueryParam:string = getQueryParamPronunciation(searchWordRef)
  let monthQueryParam:string = getQueryParamMonth(selectedMonthRef);
  let tagQueryParam:string = getQueryParamTag(selectedTagRef);
  let allQueryParams:string[] = [titleQueryParam, pronunciationQueryParam, monthQueryParam, tagQueryParam];
  let inputQueryParam:string[] = allQueryParams.filter(x => x != "")

  let endpoint = inputQueryParam.length > 0
    ? `${import.meta.env.VITE_DOMAIN}/words-info?${inputQueryParam.join("&")}`
    : `${import.meta.env.VITE_DOMAIN}/words-info`;

  const updateWordCardsOnMonth = (month: number) => {
      selectedMonthRef.current = month;
      inputQueryParam = getQueryParams(selectedMonthRef, selectedTagRef, searchWordRef)
      endpoint = getEndpoint(inputQueryParam);
      axios.get(endpoint).then((response) => {
        try{
          setAnother(!another)
          // console.log(response.data.data)
          const converted = ToWordCards(response.data.data);
          setWordCards(converted);
        } catch(error){
          console.error(`error:${error}`)
        }
      })
  }
  const updateWordCardsOnTag = (tag: number) => {
    console.log(`updateWordCardsOnTagを実行します：タグ：${tag}`)
    selectedTagRef.current = tag;
    inputQueryParam = getQueryParams(selectedMonthRef, selectedTagRef, searchWordRef)
    endpoint = getEndpoint(inputQueryParam);
    console.log(endpoint)
      axios.get(endpoint).then((response) => {
        try{
          setAnother(!another)
          // console.log(response.data.data)
          const converted = ToWordCards(response.data.data);
          setWordCards(converted);
        } catch(error){
          console.error(`error:${error}`)
        }
      })
  }
  const updateWordCardsOnText = (searchText: string) => {
    searchWordRef.current = searchText;
    inputQueryParam = getQueryParams(selectedMonthRef, selectedTagRef, searchWordRef)
    endpoint = getEndpoint(inputQueryParam);
      axios.get(endpoint).then((response) => {
        try{
          setAnother(!another)
          // console.log(response.data.data)
          const converted = ToWordCards(response.data.data);
          setWordCards(converted);
        } catch(error){
          console.error(`error:${error}`)
        }
      })
  }

  return (
      <div className='l-reverse'>
        <nav className='l-reverse__nav'>
          <NavBar action={updateWordCardsOnMonth} selectedMonthRef={selectedMonthRef} />
          <Divider sx={{height:'10px'}}/>
        </nav>
        <div className='l-reverse__body'>
          <nav className='l-reverse__localNav' style={{paddingLeft:'20px', paddingRight:'20px'}}>
            <TagBar action={updateWordCardsOnTag} selectedTagRef={selectedTagRef} />
            <SearchBox searchWordRef={searchWordRef} action={updateWordCardsOnText} />  
            {another && <WordCardBar action={handleSelectWord} wordCardEntities={wordCards} endpoint={endpoint} setStateAction={setWordCards} />}
            {!another && <WordCardBar action={handleSelectWord} wordCardEntities={wordCards} endpoint={endpoint} setStateAction={setWordCards} />}
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


function getQueryParamMonth(input: React.MutableRefObject<number>): string {
    return input.current >= 0 ? `month=${input.current}` : "";
}
function getQueryParamTag(input: React.MutableRefObject<number>): string {
  return input.current >= 0 ? `tag-id=${input.current}` : "";
}
function getQueryParamTitle(input: React.MutableRefObject<string>): string {
  return input.current != "" ? `title=${input.current}` : "";
}
function getQueryParamPronunciation(input: React.MutableRefObject<string>): string {
  return input.current != "" ? `pronunciation=${input.current}` : "";
}

function getQueryParams(month: React.MutableRefObject<number>, tag: React.MutableRefObject<number>, searchText: React.MutableRefObject<string>): string[] {
  let titleQueryParam:string = getQueryParamTitle(searchText);
  let pronunciationQueryParam:string = getQueryParamPronunciation(searchText)
  let monthQueryParam:string = getQueryParamMonth(month);
  let tagQueryParam:string = getQueryParamTag(tag);
  let allQueryParams:string[] = [titleQueryParam, pronunciationQueryParam, monthQueryParam, tagQueryParam];
  let inputQueryParam:string[] = allQueryParams.filter(x => x != "")
  return inputQueryParam
}

function getEndpoint(params: string[]): string {
  let endpoint = params.length > 0
    ? `${import.meta.env.VITE_DOMAIN}/words-info?${params.join("&")}`
    : `${import.meta.env.VITE_DOMAIN}/words-info`;

    return endpoint;
}