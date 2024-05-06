import Stack from '@mui/material/Stack';
import { Month } from '../../domains/Months';
import MonthChip from './MonthChip';
import './MonthChip.css'
import React from 'react';
import { WordCardEntity } from './WordCardEntity';


const MonthChips: React.FC<WordCardEntity> = props => {
  return (
    <Stack direction="column" spacing={0.5}>
      {props.months.map(month => (
        <MonthChip key={month.month} title={month.title()} season={month.season()} />
      ))}
    </Stack>
  );
}

export default MonthChips