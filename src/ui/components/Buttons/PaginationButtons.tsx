import { Box } from '@mui/material'
import GenericButton from './GenericButton'

interface PaginationButtonsProps {
    onPrevious: () => void
    onNext: () => void
    disablePrevious: boolean
    disableNext: boolean
}

export default function PaginationButtons({
    onPrevious,
    onNext,
    disablePrevious,
    disableNext
}: PaginationButtonsProps) {
    return (
        <Box mt={4} className="flex justify-between">
            <GenericButton disabled={disablePrevious} onClick={onPrevious} sx={{ mr: 2 }}>
                Previous
            </GenericButton>
            <GenericButton disabled={disableNext} onClick={onNext}>
                Next
            </GenericButton>
        </Box>
    )
}
