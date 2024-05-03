import Stack from '@mui/material/Stack';
import { months } from '../../Months';
import MonthChip from './MonthChip';
import './MonthChip.css'

export default function MonthChips() {
  return (
    <Stack direction="column" spacing={0.5}>
      {months.map(month => (
        <MonthChip title={month.title} season={month.season} month={month.month} wordCount={month.wordCount} />
      ))}
    </Stack>
  );
}