import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import './TabBar.css'
import { Tag } from '../../Tags';

export default function TabBar() {
  const [value, setValue] = React.useState(1);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tags: Tag[] = [
    {tagId:1, tagName:"天候"},
    {tagId:2, tagName:"自然"},
    {tagId:3, tagName:"動物"},
    {tagId:4, tagName:"伝統"},
    {tagId:5, tagName:"和歌"},
    {tagId:6, tagName:"物語"},
    {tagId:7, tagName:"禅語"},
    {tagId:8, tagName:"二十四節気"},
  ]

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper'}}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable auto tabs example"
      >
        {tags.map(tag => (
          <Tab key={tag.tagId} value={tag.tagId} label={tag.tagName} />
        ))}
      </Tabs>
    </Box>
  );
}