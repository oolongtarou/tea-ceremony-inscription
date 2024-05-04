import MonthChips from './MonthChips';
import WordTags from './WordTags';
import Description from './WordDescription';
import WordTitle from './WordTitle';
import './WordCard.css'
import { WordCardEntity } from './WordCardEntity';
import React from 'react';

interface WordCardProps {
  wordCard: WordCardEntity
  selectWordAction: (wordId: number) => void
}

const WordCard: React.FC<WordCardProps> = props => {
  const tag = props.wordCard.tags.join(", ");
  const wordId = props.wordCard.wordId;
  const handleClick= () => {
    props.selectWordAction(wordId)
  }
  return (
    <div style={{display:'flex', flexWrap:'nowrap', maxHeight:'300px'}} className='word-card' onClick={handleClick}>
      <div style={{width:'15%', marginTop:'5px', marginBottom:'5px', paddingLeft:'5px'}}>
      <MonthChips {...props.wordCard} />          
      </div>
      <div style={{width:'85%', marginLeft:'10px'}}>
              <WordTitle title={props.wordCard.title} pronunciation={props.wordCard.pronunciation} mainFontSize='27.5px' subFontSize='100%' />
              <Description description={props.wordCard.description} />
              <WordTags tag={tag} inputFontSize='15px' inputImgSize={20} />
      </div>  
    </div>
  );
}

export default WordCard;