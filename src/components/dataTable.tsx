import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { TextField, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface DataTableProps {
    showSearch?: boolean;
    rows: GridRowsProp;
    columns: GridColDef[];
    [x: string]: any; 
}

const DataTable: React.FC<DataTableProps> = ({ showSearch=true,rows, columns, ...props }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const filteredRows = rows.filter((row) => {
        return columns.some((column) => {
            const value = row[column.field];
            return value ? value.toString().toLowerCase().includes(searchText.toLowerCase()) : false;
        });
    });

    return (
        <Box sx={{ height: 400, width: '100%', marginTop: 2 }}>
            {showSearch && (
              <TextField
              fullWidth
              variant="outlined"
              value={searchText}
              onChange={handleSearch}
              placeholder="Search"
              margin="normal"
              InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                          <SearchIcon />
                      </InputAdornment>
                  ),
              }}
          />
            )}
            <DataGrid
                rows={filteredRows}
                columns={columns}
                {...props}
            />
        </Box>
    );
}

DataTable.defaultProps = {
};

export default DataTable;