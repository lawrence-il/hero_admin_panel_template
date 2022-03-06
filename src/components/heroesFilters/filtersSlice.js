import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    option: [],
    activeBtn: 'all'
}

const filtersSlice = createSlice({
    name: 'filter',
    initialState,
    optionFetched: (state, action) => {
        state.option = action.payload
    },
    filteringValue: (state, action) => {
        state.activeBtn = action.payload
    },
    filteredHeroes: (state, action) => {
        state.heroes = action.payload
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    optionFetched,
    filteringValue,
    filteredHeroes
} = actions