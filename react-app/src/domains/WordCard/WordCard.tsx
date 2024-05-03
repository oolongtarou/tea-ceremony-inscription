import MonthChips from './MonthChips';
import WordTags from './WordTags';
import Description from './WordDescription';
import WordTitle from './WordTitle';
import './WordCard.css'



export default function WordCard() {
  return (
    <div style={{display:'flex', flexWrap:'nowrap', maxHeight:'300px'}} className='word-card'>
      <div style={{width:'15%', marginTop:'5px', marginBottom:'5px', paddingLeft:'5px'}}>
        <MonthChips />          
      </div>
      <div style={{width:'85%', marginLeft:'10px'}}>
              <WordTitle mainFontSize='27.5px' subFontSize='100%' />
              <Description />
              <WordTags />
      </div>  
    </div>
  );
}