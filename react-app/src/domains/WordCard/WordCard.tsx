import MonthChips from './MonthChips';
import WordTags from './WordTags';
import Description from './WordDescription';
import WordTitle from './WordTitle';
import './WordCard.css'
import { WordCardEntity } from './WordCardEntity';
import { Month } from '../../Months';
import React from 'react';

// const wordCard: WordCardEntity = new WordCardEntity(1, "篝火", "かがりび", "語釈です。", [new Month(1,0), new Month(2,0)], ["和歌", "伝統"]);
// const tag = wordCard.tags.join(", ");

const WordCard: React.FC<WordCardEntity> = props => {
  const tag = props.tags.join(", ");
  return (
    <div style={{display:'flex', flexWrap:'nowrap', maxHeight:'300px'}} className='word-card'>
      <div style={{width:'15%', marginTop:'5px', marginBottom:'5px', paddingLeft:'5px'}}>
      <MonthChips {...props} />          
      </div>
      <div style={{width:'85%', marginLeft:'10px'}}>
              <WordTitle title={props.title} pronunciation={props.pronunciation} mainFontSize='27.5px' subFontSize='100%' />
              <Description description={props.description} />
              <WordTags tag={tag} inputFontSize='15px' inputImgSize={20} />
      </div>  
    </div>
  );
}
// const WordCard: React.FC<WordCardEntity> = props => {
//   return (
//     <div style={{display:'flex', flexWrap:'nowrap', maxHeight:'300px'}} className='word-card'>
//       <div style={{width:'15%', marginTop:'5px', marginBottom:'5px', paddingLeft:'5px'}}>
//       <MonthChips {...wordCard} />          
//       </div>
//       <div style={{width:'85%', marginLeft:'10px'}}>
//               <WordTitle title={wordCard.title} pronunciation={wordCard.pronunciation} mainFontSize='27.5px' subFontSize='100%' />
//               <Description description={wordCard.description} />
//               <WordTags tag={tag} inputFontSize='15px' inputImgSize={20} />
//       </div>  
//     </div>
//   );
// }

function toMonths(nums: number[]): Month[] {
  let tmp: Month[] = [];
  for (let num of nums) {
    tmp.push(new Month(num, 0));
  }
  return tmp;
}

export default WordCard;