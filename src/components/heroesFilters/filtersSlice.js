import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    option: [],
    activeBtn: 'all'
}

export const fetchOption = createAsyncThunk(
    'filter/fetchOption',
    async () => {
        const {request} = useHttp();
        return await request(`http://localhost:3001/chooseElement`)
    }
)

const filtersSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filteringValue: (state, action) => {
            state.activeBtn = action.payload
        },
        filteredHeroes: (state, action) => {
            state.heroes = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOption.fulfilled, (state, action) => {
                state.option = action.payload
            })
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    optionFetched,
    filteringValue,
    filteredHeroes
} = actions