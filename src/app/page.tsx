'use client'

import { Alert, Box, CircularProgress, Grid } from '@mui/material'
import { PokemonCard } from '@/ui/components/Cards'
import PaginationButtons from '@/ui/components/Buttons/PaginationButtons'
import GenericButton from '@/ui/components/Buttons/GenericButton'
import { usePokemonSearch } from '@/lib/hooks'
import { SearchBar } from '@/ui/components/Searchbar'

export default function Home() {
    const {
        setPage,
        searchQuery,
        setSearchQuery,
        searchResult,
        searchError,
        pokemonDetails,
        capturedPokemons,
        handleCatch,
        handleSearch,
        handleResetSearch,
        isLoading,
        error,
        data
    } = usePokemonSearch()

    if (isLoading)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        )

    if (error)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Alert severity="error">Error loading Pokémons</Alert>
            </Box>
        )

    return (
        <Box component="main" className="flex flex-col items-center p-8">
            <form onSubmit={handleSearch} className="mb-4 w-full">
                <SearchBar
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    error={Boolean(searchError)}
                    helperText={searchError ? 'No Pokémon found. Please try another name.' : ''}
                />
            </form>
            {searchResult ? (
                <Box className="w-full">
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <PokemonCard
                                name={searchResult.name}
                                image={searchResult.sprites.front_default}
                                buttonLabel={
                                    capturedPokemons.some(p => p.id === searchResult.id)
                                        ? 'Caught!'
                                        : 'Catch'
                                }
                                onButtonClick={() => handleCatch(searchResult)}
                                disabled={capturedPokemons.some(p => p.id === searchResult.id)}
                                types={searchResult.types.map(t => t.type.name)}
                            />
                        </Grid>
                    </Grid>
                    <GenericButton onClick={handleResetSearch} sx={{ mt: 4 }}>
                        Reset Pokemon Search
                    </GenericButton>
                </Box>
            ) : (
                <>
                    <Grid container spacing={3}>
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
                                    types={pokemon.types.map(t => t.type.name)}
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
                </>
            )}
        </Box>
    )
}
