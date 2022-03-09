import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const heroAdapter = createEntityAdapter();

const initialState = heroAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
})

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/heroes");
    }
)


const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesDeleting: (state, action) => {
            heroAdapter.setAll(state, action);

        },
        heroesAdded: (state, action) => {
            heroAdapter.addOne(state, action.payload);
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {
                state.heroesLoadingStatus = 'loading'
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                heroAdapter.setAll(state, action.payload)
                state.heroesLoadingStatus = 'idle';
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingStatus = 'error'
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = heroesSlice;

export const {selectAll} = heroAdapter.getSelectors(state => state.heroes);

export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesDeleting,
    heroesAdded
} = actions;