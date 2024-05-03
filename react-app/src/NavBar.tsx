import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { months } from './Months';

export default function NavBar() {
    const [value, setValue] = React.useState(-1);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    return (
        <Box sx={{ bgcolor: 'background.paper'}} >
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
                </Tabs>
        </Box>
        );    
};