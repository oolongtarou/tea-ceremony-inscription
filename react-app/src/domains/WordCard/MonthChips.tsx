import Stack from '@mui/material/Stack';
import { months } from '../../Months';
import MonthChip from './MonthChip';
import './MonthChip.css'

const input = [
  {month:1, title: "1月", season:"winter", wordCount: 23},
  {month:2, title: "2月", season:"winter", wordCount: 346},
  {month:3, title: "3月", season:"spring", wordCount: 56},
]

export default function MonthChips() {
  return (
    <Stack direction="column" spacing={0.5}>
      {input.map(month => (
        <MonthChip key={month.month} title={month.title} season={month.season} month={month.month} wordCount={month.wordCount} />
      ))}
    </Stack>
  );
}