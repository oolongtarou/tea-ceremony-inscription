import Stack from '@mui/material/Stack';
import MonthChip from './MonthChip';
import '../WordCard/MonthChip.css'
import { WordInfoDetail } from './WordInfoDetail';

const MonthChips: React.FC<WordInfoDetail> = props => {
  return (
    <Stack direction="row" spacing={1}>
      {props.months.map(month => (
        <MonthChip key={month.month} title={month.title()} season={month.season()} />
      ))}
    </Stack>
  );
}

export default MonthChips