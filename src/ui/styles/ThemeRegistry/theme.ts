import { createTheme } from '@mui/material/styles'
import { createPalette } from './createPalette'
import { createComponents } from './createComponents'
import { createTypography } from './createTypography'
import { borderRadius } from './defaults'

const palette = createPalette()
const components = createComponents()
const typography = createTypography()

const theme = createTheme({
    components,
    palette,
    typography,
    shape: {
        borderRadius: borderRadius
    }
})

export default theme
