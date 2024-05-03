import Chip from '@mui/material/Chip';
import React from 'react';
import { Month } from '../../Months';

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

const MonthChip: React.FC<Month> = (props) => {
    return (
        <Chip 
            className={seasonClassMapping[props.season]} 
            label={props.title} 
            size='medium'
            sx={{
                backgroundColor:seasonColors[props.season],
                color:'white',
                paddingLeft:'10px',
                paddingRight:'10px',
                fontSize:'1em'
            }}
        />
    );
}

export default MonthChip;