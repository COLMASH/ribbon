import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { cn } from '../../../lib/utils'

interface Props {
    loadingMessage?: string
    className?: string
    spinnerClassName?: string
    spinnerSize?: string
}

export default function GenericSpinner({
    loadingMessage = 'Loading...',
    className,
    spinnerClassName,
    spinnerSize = '40px'
}: Props) {
    return (
        <div
            className={cn(
                'flex h-[383px] flex-row items-center justify-center text-2xl font-semibold text-neutral-400',
                className
            )}
        >
            <p>{loadingMessage}</p>
            <div
                className={cn(
                    'flex flex-col items-center justify-center text-white',
                    spinnerClassName
                )}
            >
                <CircularProgress color="inherit" size={spinnerSize} />
            </div>
        </div>
    )
}
