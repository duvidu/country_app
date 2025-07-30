import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const Filter = ({ onFilter }) => {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel>Filter by Region</InputLabel>
      <Select
        defaultValue=""
        onChange={(e) => onFilter(e.target.value)}
        label="Filter by Region"
      >
        <MenuItem value="">All Regions</MenuItem>
        {regions.map(region => (
          <MenuItem key={region} value={region}>{region}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Filter;    