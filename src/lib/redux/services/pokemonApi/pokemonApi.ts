import { POKEMONS_PER_PAGE } from '@/lib/utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Pokemon {
    name: string
    url: string
}

interface PokemonListResponse {
    count: number
    next: string | null
    previous: string | null
    results: Pokemon[]
}

interface PokemonDetails {
    id: number
    name: string
    sprites: { front_default: string }
    types: { type: { name: string } }[]
}

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: builder => ({
        getPokemons: builder.query<PokemonListResponse, number>({
            query: (page = 1) =>
                `pokemon?limit=${POKEMONS_PER_PAGE}&offset=${(page - 1) * POKEMONS_PER_PAGE}`
        }),
        searchPokemonByName: builder.query<PokemonDetails, string>({
            query: name => `pokemon/${name.toLowerCase()}`
        })
    })
})

export const { useGetPokemonsQuery, useSearchPokemonByNameQuery } = pokemonApi
