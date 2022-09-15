import React, { FC, useEffect, useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from '../../../../../hooks/useDebounce';

interface Props {
  onSearch: (query: string) => void;
}

export const SearchImageInput: FC<Props> = React.memo((props) => {
  const { onSearch } = props;

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedValue = useDebounce<string>(searchQuery, 1000);

  useEffect(() => {
    onSearch(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <TextField
      id="standard-basic"
      placeholder='Пошук картинки (англійською)'
      variant="standard"
      fullWidth
      autoComplete="off"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyDown={(e) => {
        if (e.code === 'Enter') {
          e.preventDefault();
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
});
