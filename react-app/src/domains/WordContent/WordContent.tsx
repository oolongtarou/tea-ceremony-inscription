import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import WordTitle from '../WordCard/WordTitle';
import WordTags from '../WordCard/WordTags';

import { WordInfoDetail } from './WordInfoDetail';
import WordDescription from './WordDescription';
import MonthChips from './MonthChips';
import React from 'react';
import axios from 'axios';
import { toWordDetail } from '../Converter/Converter';


interface WordContentProps {
  selectedWordId: number
}


const WordContent: React.FC<WordContentProps> = props => {
    const [wordDetail, setWordDetail] = React.useState<WordInfoDetail>(new WordInfoDetail(0,"","",[],[],[]));
      React.useEffect(() => {
        // console.log(`props.WordIdRef.current：${props.selectedWordId}`)
        if(props.selectedWordId == 0){
          return;
        }
        const endpoint = `${import.meta.env.VITE_DOMAIN}/word-detail?word-id=${props.selectedWordId}`;
        console.log(`endpoint:${endpoint}`)
        axios.get(endpoint).then((response) => {
          try{
            const converted = toWordDetail(response.data.data)
            setWordDetail(converted)
          } catch(error){
            console.error(`error:${error}`)
          }
        })    
      }, [props.selectedWordId]);

    return(
        <Container maxWidth='lg'>  
            <WordTitle title={wordDetail.title} pronunciation={wordDetail.pronunciation} mainFontSize='50px' subFontSize='27.5px' />
            <MonthChips {...wordDetail}/>
            <div style={{marginTop:'30px'}}/>
            <WordTags tag={wordDetail.tags.join(", ")} inputFontSize='20px' inputImgSize={25} />
            <Divider style={{marginBottom:'30px'}} />
            {wordDetail.descriptions.map((description , index) => (
                <WordDescription key={index} {...description} />
            ))}
        </Container>
    )
}


export default WordContent