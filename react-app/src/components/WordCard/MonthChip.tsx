import Chip from '@mui/material/Chip';
import { Month } from '../../domains/Months';
import React from 'react';
import './MonthChip.css'

const seasonClassMapping:{[season: string]: string} = {
  "winter":"winter-color",
  "spring":"spring-color",
  "summer":"summer-color",
  "autumn":"autumn-color",
  "no":"no-season-color"
}
const seasonColors: { [key: string]: string} = {
    "no": '#939393',
    "winter": '#00B5EA',
    "spring": '#EE7D7F',
    "summer": '#4DB339',
    "autumn": '#A74033',
}

interface MonthProps {
    title: string;
    season: string;
}

const MonthChip: React.FC<MonthProps> = (props) => {
    return (
        <Chip 
            className={seasonClassMapping[props.season]} 
            label={props.title} 
            size='small'
            sx={{
                backgroundColor:seasonColors[props.season],
                color:'white',
            }}
        />
    );
}

export default MonthChip;