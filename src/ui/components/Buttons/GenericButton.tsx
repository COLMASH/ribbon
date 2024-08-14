import { colors } from '@/ui/styles/ThemeRegistry/defaults'
import { Button, ButtonProps } from '@mui/material'

interface GenericButtonProps extends ButtonProps {
    children: React.ReactNode
}

export default function GenericButton({ children, sx, ...props }: GenericButtonProps) {
    return (
        <Button
            sx={{
                ...sx,
                backgroundColor: colors.ribbonGreen,
                color: 'white',
                '&:hover': {
                    backgroundColor: colors.neutral[600]
                },
                '&.Mui-disabled': {
                    color: colors.neutral[400]
                }
            }}
            {...props}
        >
            {children}
        </Button>
    )
}
