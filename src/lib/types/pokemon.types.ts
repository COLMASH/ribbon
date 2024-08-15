export interface Pokemon {
    name: string
    url: string
}

export interface PokemonListResponse {
    count: number
    next: string | null
    previous: string | null
    results: Pokemon[]
}

export interface PokemonDetails {
    id: number
    name: string
    sprites: { front_default: string }
    types: { type: { name: string } }[]
}

export interface PokemonSliceType {
    id: number
    name: string
    image: string
    types: string[]
}

export interface PokemonSliceStateType {
    capturedPokemons: PokemonSliceType[]
}
