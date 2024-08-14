import { createTheme } from '@mui/material'

const theme = createTheme()

export function createComponents() {
    return {
        MuiContainer: {
            styleOverrides: {
                root: {
                    [theme.breakpoints.up('sm')]: {
                        paddingLeft: '1rem',
                        paddingRight: '1rem'
                    }
                }
            }
        }
    }
}
