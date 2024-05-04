import InfiniteScroll from 'react-infinite-scroller';
import WordCard from './WordCard';
import axios from 'axios';
import { WordCardEntity } from './WordCardEntity';
import { ToWordCards } from '../Converter/Converter';
import React, { useImperativeHandle } from 'react';
import { Key } from '@mui/icons-material';

interface WordCardBarProps {
    action: (id: number) => void;
    wordCardEntities: WordCardEntity[]
    setStateAction: React.Dispatch<React.SetStateAction<WordCardEntity[]>>
    endpoint: string
    // ref: any
}

export interface ChildMethods {
  hello: () => void;
}

const sleep = (sec: number) => new Promise(resolve =>
    setTimeout(resolve, sec * 1000));

const WordCardBar: React.FC<WordCardBarProps> = props => {
    const [hasMore, setHasMore] = React.useState(true) 
    const loadUser = async (page: number) => {  
      const inputEndpoint = props.endpoint;
      const offset = inputEndpoint.includes("?") ? `&offset=${page * 20}` : `?offset=${page * 20}`
      const URL:string = inputEndpoint +  offset;
      // const URL:string = props.endpoint + `?offset=${page * 20}`;
      // await sleep(1)
      await axios.get(URL).then((response) => {
        try{
            console.log(`URL${URL}`)
            console.log(response.data.data)
            const data = ToWordCards(response.data.data);
            const count = data.length;
            props.setStateAction([...props.wordCardEntities, ...data]);
            setHasMore(count > 0)
        } catch(error) {
            console.log(error)
        }
        })
    }

    // useImperativeHandle()

    return(
        <div style={{overflow:'auto', height:715}}>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadUser}
          // loader={<div>loadingなう</div>}
          hasMore={hasMore}
          useWindow={false}
        >
      {props.wordCardEntities.map((wordCard, index) => (
            <WordCard key={index} wordCard={wordCard} selectWordAction={props.action} />
          ))}
        </InfiniteScroll>
      </div>
    )
}


export default WordCardBar