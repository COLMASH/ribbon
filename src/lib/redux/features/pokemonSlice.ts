import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { PokemonSliceStateType, PokemonSliceType } from '@/lib/types'

const initialState: PokemonSliceStateType = {
    capturedPokemons: []
}

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        capturePokemon: (state, action: PayloadAction<PokemonSliceType>) => {
            state.capturedPokemons.push(action.payload)
            localStorage.setItem('capturedPokemons', JSON.stringify(state.capturedPokemons))
        },
        releasePokemon: (state, action: PayloadAction<number>) => {
            state.capturedPokemons = state.capturedPokemons.filter(
                pokemon => pokemon.id !== action.payload
            )
            localStorage.setItem('capturedPokemons', JSON.stringify(state.capturedPokemons))
        },
        loadCapturedPokemons: state => {
            const storedPokemons = localStorage.getItem('capturedPokemons')
            if (storedPokemons) {
                state.capturedPokemons = JSON.parse(storedPokemons)
            }
        }
    }
})

export const { capturePokemon, releasePokemon, loadCapturedPokemons } = pokemonSlice.actions

export const selectCapturedPokemons = (state: RootState) => state.pokemon.capturedPokemons

export default pokemonSlice.reducer
