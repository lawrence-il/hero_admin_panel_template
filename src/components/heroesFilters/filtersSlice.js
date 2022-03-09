import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const fiterAdapter = createEntityAdapter({
    selectId: (filters) => filters.value
});

const initialState = fiterAdapter.getInitialState({
    activeBtn: 'all'
})

export const fetchFilter = createAsyncThunk(
    'filter/fetchFilter',
    async () => {
        const {request} = useHttp();
        return await request(`http://localhost:3001/filters`)
    }
)

const filtersSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filteringValue: (state, action) => {
            state.activeBtn = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilter.fulfilled, (state, action) => {
                fiterAdapter.setAll(state, action.payload)
            })
    }
});

const {actions, reducer} = filtersSlice;

export const {selectAll} = fiterAdapter.getSelectors(state => state.filters);

export default reducer;
export const {
    filterFetched,
    filteringValue,
} = actions