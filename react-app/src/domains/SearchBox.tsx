import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase, Paper } from '@mui/material';
import React from 'react';

interface SearchBoxProps {
    action: (searchText: string) => void
    searchWordRef: React.MutableRefObject<string>
}

const SearchBox: React.FC<SearchBoxProps> = props => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = event.target.value;
        props.searchWordRef.current = inputVal
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          event.preventDefault(); // デフォルトの Enter キーの挙動を防ぐ
          console.log('Enter key pressed!');
          props.action(props.searchWordRef.current);
        }
      };

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', backgroundColor:'#F5F5F5', marginTop:"10px", marginBottom:"10px"}}

    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="検索"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => props.action(props.searchWordRef.current)}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
export default SearchBox