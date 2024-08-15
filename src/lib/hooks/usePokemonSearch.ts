import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { capturePokemon, selectCapturedPokemons } from '@/lib/redux/features/pokemonSlice'
import { useGetPokemonsQuery, useSearchPokemonByNameQuery } from '@/lib/redux/services/pokemonApi'
import { PokemonDetails } from '../types'

export function usePokemonSearch() {
    const [page, setPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
    const [searchResult, setSearchResult] = useState<PokemonDetails | null>(null)
    const { data, error, isLoading } = useGetPokemonsQuery(page)
    const { data: searchData, error: searchError } = useSearchPokemonByNameQuery(
        debouncedSearchQuery,
        {
            skip: !debouncedSearchQuery
        }
    )
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([])
    const dispatch = useDispatch()
    const capturedPokemons = useSelector(selectCapturedPokemons)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery)
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [searchQuery])

    useEffect(() => {
        if (searchData) {
            setSearchResult(searchData)
        }
    }, [searchData])

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            if (data?.results && !searchResult) {
                const details = await Promise.all(
                    data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()))
                )
                setPokemonDetails(details)
            }
        }
        fetchPokemonDetails()
    }, [data, searchResult])

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

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (searchQuery) {
            setSearchResult(null)
        }
    }

    const handleResetSearch = () => {
        setSearchQuery('')
        setSearchResult(null)
    }

    return {
        page,
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
    }
}
