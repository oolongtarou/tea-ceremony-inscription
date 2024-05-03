import MonthChips from './MonthChips';
import WordTags from './WordTags';
import Description from './WordDescription';
import WordTitle from './WordTitle';

export default function WordCard() {
  return (
    <div style={{display:'flex', flexWrap:'nowrap', maxHeight:'300px'}}>
      <div style={{width:'15%', marginTop:'5px', marginBottom:'5px'}}>
              <MonthChips />          
      </div>
      <div style={{width:'85%', marginLeft:'10px'}}>
              <WordTitle />
              <Description />
              <WordTags />
      </div>  
    </div>
  );
}