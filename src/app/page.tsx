'use client'

import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import { capturePokemon, selectCapturedPokemons } from '@/lib/redux/features/pokemonSlice'
import { useGetPokemonsQuery } from '@/lib/redux/services/pokemonApi'
import { PokemonCard } from '@/ui/components/Cards'
import PaginationButtons from '@/ui/components/Buttons/PaginationButtons'

interface PokemonDetails {
    id: number
    name: string
    sprites: { front_default: string }
    types: { type: { name: string } }[]
}

export default function Home() {
    const [page, setPage] = useState(1)
    const { data, error, isLoading } = useGetPokemonsQuery(page)
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([])
    const dispatch = useDispatch()
    const capturedPokemons = useSelector(selectCapturedPokemons)

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            if (data?.results) {
                const details = await Promise.all(
                    data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()))
                )
                setPokemonDetails(details)
            }
        }
        fetchPokemonDetails()
    }, [data])

    const handleCatch = (pokemon: PokemonDetails) => {
        dispatch(
            capturePokemon({
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.front_default,
                types: pokemon.types.map(t => t.type.name)
            })
        )
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading Pokémons</div>

    return (
        <Box component="main" className="flex flex-col items-center p-8">
            <Grid container spacing={2}>
                {pokemonDetails.map(pokemon => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
                        <PokemonCard
                            name={pokemon.name}
                            image={pokemon.sprites.front_default}
                            buttonLabel={
                                capturedPokemons.some(p => p.id === pokemon.id)
                                    ? 'Caught!'
                                    : 'Catch'
                            }
                            onButtonClick={() => handleCatch(pokemon)}
                            disabled={capturedPokemons.some(p => p.id === pokemon.id)}
                        />
                    </Grid>
                ))}
            </Grid>
            <PaginationButtons
                onPrevious={() => setPage(prev => Math.max(prev - 1, 1))}
                onNext={() => setPage(prev => prev + 1)}
                disablePrevious={!data?.previous}
                disableNext={!data?.next}
            />
        </Box>
    )
}
