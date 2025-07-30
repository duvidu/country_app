import { useState } from 'react';
import { TextField, IconButton, InputAdornment, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Paper component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );
};

export default Search;