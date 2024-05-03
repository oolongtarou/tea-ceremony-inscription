import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import './MonthChip.css'

export default function MonthChip() {
  return (
    <Stack direction="column" spacing={1}>
      <Chip className='no-season-color' label="無季" />
      <Chip className='winter-color' label="1月" />
      <Chip className='winter-color' label="2月" />
      <Chip className='spring-color' label="3月" />
      <Chip className='spring-color' label="4月" />
      <Chip className='spring-color' label="5月" />
      <Chip className='summer-color' label="6月" />
      <Chip className='summer-color' label="7月" />
      <Chip className='summer-color' label="8月" />
      <Chip className='autumn-color' label="9月" />
      <Chip className='autumn-color' label="10月" />
      <Chip className='autumn-color' label="11月" />
      <Chip className='winter-color' label="12月" />
    </Stack>
  );
}