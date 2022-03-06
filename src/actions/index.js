import { heroesFetching, heroesFetched, heroesFetchingError } from '../components/heroesList/heroesSlice';
import { optionFetched } from '../components/heroesFilters/filtersSlice';

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
}

export const fetchOption = (request) => (dispatch) => {
    dispatch(heroesFetching);
    request(`http://localhost:3001/chooseElement`)
            .then(data => dispatch(optionFetched(data)))
}
