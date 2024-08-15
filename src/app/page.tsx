'use client'

import { Alert, Box, CircularProgress } from '@mui/material'
import PaginationButtons from '@/ui/components/Buttons/PaginationButtons'
import GenericButton from '@/ui/components/Buttons/GenericButton'
import { usePokemonSearch } from '@/lib/hooks'
import { SearchBar } from '@/ui/components/Searchbar'
import PokemonCardGrid from '@/ui/components/Cards/PokemonCardGrid'

export default function Home() {
    const {
        setPage,
        searchQuery,
        setSearchQuery,
        searchResult,
        searchError,
        pokemonDetails,
        handleCatch,
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
            <SearchBar
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                error={Boolean(searchError)}
                helperText={searchError ? 'No Pokémon found. Please try another name.' : ''}
            />
            {searchResult ? (
                <Box className="w-full">
                    <PokemonCardGrid pokemons={[searchResult]} handleCatch={handleCatch} />
                    <GenericButton onClick={handleResetSearch} sx={{ mt: 4 }}>
                        Reset Pokemon Search
                    </GenericButton>
                </Box>
            ) : (
                <>
                    <PokemonCardGrid pokemons={pokemonDetails} handleCatch={handleCatch} />
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
