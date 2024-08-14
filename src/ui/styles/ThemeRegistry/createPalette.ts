import { common } from '@mui/material/colors'
import { PaletteOptions, alpha } from '@mui/material'
import { colors } from './defaults'

export function createPalette(): PaletteOptions {
    return {
        background: {
            default: common.white,
            paper: common.white
        },
        mode: 'light',
        primary: colors.planetary,
        divider: colors.divider,
        text: {
            primary: colors.neutral[900],
            secondary: colors.neutral[500],
            disabled: alpha(colors.neutral[900], 0.38)
        }
    }
}
