import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from 'axios';

import './TabBar.css'
import { WordTag } from '../../WordTags';
import { ToWordTags } from '../Converter/Converter';

interface TagBarProps {
  action: () => void
  selectedTagRef: React.MutableRefObject<number>
}

const TagBar: React.FC<TagBarProps> = props => {
  const[wordTags, setWordTags] = React.useState<WordTag[]>([])
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    props.selectedTagRef.current = newValue;
    props.action();
  };

  React.useEffect(() => {
    const endpoint = `${import.meta.env.VITE_DOMAIN}/word-tags`;
    console.log(`endpoint:${endpoint}`)
    axios.get(endpoint).then((response) => {
      try{
        setWordTags(ToWordTags(response.data.data));
      } catch(error){
        console.error(`error:${error}`)
      }
    })    
  }, []);

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, color:'#36540f'}}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable auto tabs example"
        textColor='inherit'
        TabIndicatorProps={{
            style: {
                backgroundColor: '#36540f',
                height: '2px'
            }
        }}
      >
        <Tab key={0} value={0} label='すべて'/>
        {wordTags.map(tag => (
          <Tab key={tag.tagId} value={tag.tagId} label={tag.tagName} />
        ))}
      </Tabs>
    </Box>
  );
}

export default TagBar