import { useState } from 'react'
import { Card, CardContent, CardActions, Button, Typography, Collapse, Box } from '@mui/material'
import Image from 'next/image'

interface PokemonCardProps {
    name: string
    image: string
    buttonLabel: string
    onButtonClick: () => void
    disabled?: boolean
    types: string[]
}

export default function PokemonCard({
    name,
    image,
    buttonLabel,
    onButtonClick,
    disabled,
    types
}: PokemonCardProps) {
    const [expanded, setExpanded] = useState(false)

    const handleToggleExpand = () => {
        setExpanded(!expanded)
    }

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                transform: expanded ? 'scale(1.05)' : 'scale(1)'
            }}
            onClick={handleToggleExpand}
        >
            <CardContent>
                <Image
                    src={image}
                    alt={name}
                    className="mx-auto"
                    width={100}
                    height={100}
                    priority
                />
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Box sx={{ padding: 2 }}>
                    <Typography variant="h6">Types:</Typography>
                    <Typography variant="body2">{types.join(', ')}</Typography>
                </Box>
            </Collapse>
            <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                    size="small"
                    disabled={disabled}
                    onClick={e => {
                        e.stopPropagation()
                        onButtonClick()
                    }}
                    sx={{
                        '&.Mui-disabled': {
                            color: buttonLabel === 'Caught!' ? 'red' : 'rgba(0, 0, 0, 0.26)'
                        }
                    }}
                >
                    {buttonLabel}
                </Button>
            </CardActions>
        </Card>
    )
}
