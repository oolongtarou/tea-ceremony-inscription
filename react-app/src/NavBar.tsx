import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function NavBar() {

    const months = [
        {month:-1, title: "すべて", wordCount: 1111},
        {month:1, title: "1月", wordCount: 23},
        {month:2, title: "2月", wordCount: 346},
        {month:3, title: "3月", wordCount: 56},
        {month:4, title: "4月", wordCount: 123},
        {month:5, title: "5月", wordCount: 546},
        {month:6, title: "6月", wordCount: 32},
        {month:7, title: "7月", wordCount: 8},
        {month:8, title: "8月", wordCount: 234},
        {month:9, title: "9月", wordCount: 32},
        {month:10, title: "10月", wordCount: 31},
        {month:11, title: "11月", wordCount: 221},
        {month:12, title: "12月", wordCount: 98},
        {month:0, title: "無季", wordCount: 321},
    ]
    

    const [value, setValue] = React.useState(1);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    return (
        <Box sx={{ bgcolor: 'background.paper' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                {months.map(month => (
                    <Tab key={month.month} label={month.title} value={month.month} />
                ))}
                {/* <Tab value="1" label="Item One" />
                <Tab value="2" label="Item Two" />
                <Tab value="3" label="Item Three" />
                <Tab value="4" label="Item Four" />
                <Tab value="5" label="Item Five" />
                <Tab value="6" label="Item Six" />
                <Tab value="7" label="Item Seven" /> */}
            </Tabs>
        </Box>
        );    
};