import React from 'react'
import { TextField } from '@mui/material'
import { colors } from '@/ui/styles/ThemeRegistry/defaults'

interface SearchBarProps {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    error?: boolean
    helperText?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChange,
    error = false,
    helperText = ''
}) => {
    return (
        <TextField
            label="Search Pokémon"
            variant="outlined"
            fullWidth
            value={value}
            onChange={onChange}
            sx={{
                backgroundColor: 'white',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    '& fieldset': {
                        borderColor: error ? 'red' : 'inherit'
                    },
                    '&:hover fieldset': {
                        borderColor: error ? 'red' : 'grey'
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: error ? 'red' : colors.ribbonGreen
                    }
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    borderRadius: 'inherit'
                },
                marginBottom: '20px'
            }}
            error={error}
            helperText={helperText}
        />
    )
}

export default SearchBar
