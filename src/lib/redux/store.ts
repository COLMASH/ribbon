import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import pokemonSlice from './features/pokemonSlice'
import { pokemonApi } from './services/pokemonApi'

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    pokemon: pokemonSlice,
    [pokemonApi.reducerPath]: pokemonApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(pokemonApi.middleware)
})

export const persistor = persistStore(store)

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
