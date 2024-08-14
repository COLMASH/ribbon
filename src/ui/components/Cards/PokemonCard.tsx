import { Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import Image from 'next/image'

interface PokemonCardProps {
    name: string
    image: string
    buttonLabel: string
    onButtonClick: () => void
    disabled?: boolean
}

export default function PokemonCard({
    name,
    image,
    buttonLabel,
    onButtonClick,
    disabled
}: PokemonCardProps) {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                height: '100%'
            }}
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
            <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                    size="small"
                    disabled={disabled}
                    onClick={onButtonClick}
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
