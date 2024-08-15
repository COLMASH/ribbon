import { Grid } from '@mui/material'
import { PokemonCard } from '@/ui/components/Cards'
import { PokemonDetails } from '@/lib/types'
import { useSelector } from 'react-redux'
import { selectCapturedPokemons } from '@/lib/redux/features/pokemonSlice'

interface PokemonCardGridProps {
    pokemons: PokemonDetails[]
    handleCatch: (pokemon: PokemonDetails) => void
}

export default function PokemonCardGrid({ pokemons, handleCatch }: PokemonCardGridProps) {
    const capturedPokemons = useSelector(selectCapturedPokemons)

    return (
        <Grid container spacing={3} justifyContent="center">
            {pokemons.map(pokemon => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
                    <PokemonCard
                        name={pokemon.name}
                        image={pokemon.sprites.front_default}
                        buttonLabel={
                            capturedPokemons.some(p => p.id === pokemon.id) ? 'Caught!' : 'Catch'
                        }
                        onButtonClick={() => handleCatch(pokemon)}
                        disabled={capturedPokemons.some(p => p.id === pokemon.id)}
                        types={pokemon.types.map(t => t.type.name)}
                    />
                </Grid>
            ))}
        </Grid>
    )
}
