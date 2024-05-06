// import * as React from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import { Month, addAllWordCounts } from './domains/Months';
// import './App.css'
// import axios from "axios";
// import { ToMonthWordCounts } from './utils/Converter';

// interface NavBarProps {
//   action: (month: number) => void
//   selectedMonthRef: React.MutableRefObject<number>
// }

// const NavBar: React.FC<NavBarProps> = props => {
//     const [value, setValue] = React.useState(-1);
//     const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//         setValue(newValue);
//         props.selectedMonthRef.current = newValue;
//         props.action(newValue)
//     }
//     const [monthWordCounts, setMonthWordCounts] = React.useState<Month[]>([]);
//       React.useEffect(() => {
//         const endpoint = `${import.meta.env.VITE_DOMAIN}/month-word-count`;
//         axios.get(endpoint).then((response) => {
//           try{
//             const converted:Month[] = ToMonthWordCounts(response.data.data);
//             converted.unshift(new Month(-1, addAllWordCounts(converted)));
//             setMonthWordCounts(converted) 
//           } catch(error){
//             console.error(`error:${error}`)
//           }
//         })    
//       }, []);


//     return (
//         <Box sx={{ bgcolor: 'background.paper', color:'#36540f'}} >
//                 <Tabs
//                     value={value}
//                     onChange={handleChange}
//                     variant="scrollable"
//                     scrollButtons="auto"
//                     aria-label="scrollable auto tabs example"
//                     textColor='inherit'
//                     TabIndicatorProps={{
//                         style: {
//                             backgroundColor: '#36540f',
//                             height: '2px'
//                         }
//                     }}
//                     >
//                     {monthWordCounts.map(month => (
//                         <Tab disableRipple key={month.month} label={`${month.title()}(${month.wordCount})`} value={month.month}/>
//                     ))}
//                 </Tabs>
//         </Box>
//         );
// };

// export default NavBar 