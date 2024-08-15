'use client'

import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { Grid, Box } from '@mui/material'
import { releasePokemon, selectCapturedPokemons } from '@/lib/redux/features/pokemonSlice'
import { POKEMONS_PER_PAGE } from '@/lib/utils'
import { PokemonCard } from '@/ui/components/Cards'
import PaginationButtons from '@/ui/components/Buttons/PaginationButtons'

export default function Captured() {
    const capturedPokemons = useSelector(selectCapturedPokemons)
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const itemsPerPage = POKEMONS_PER_PAGE
    const startIndex = (page - 1) * itemsPerPage
    const currentPagePokemons = capturedPokemons.slice(startIndex, startIndex + itemsPerPage)

    return (
        <Box component="main" className="flex flex-col items-center p-8">
            <Grid container spacing={3} justifyContent={'center'}>
                {currentPagePokemons.map(pokemon => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
                        <PokemonCard
                            name={pokemon.name}
                            image={pokemon.image}
                            buttonLabel="Release Pokemon"
                            onButtonClick={() => dispatch(releasePokemon(pokemon.id))}
                            types={pokemon.types}
                        />
                    </Grid>
                ))}
            </Grid>
            <PaginationButtons
                onPrevious={() => setPage(prev => Math.max(prev - 1, 1))}
                onNext={() => setPage(prev => prev + 1)}
                disablePrevious={page === 1}
                disableNext={startIndex + itemsPerPage >= capturedPokemons.length}
            />
        </Box>
    )
}
