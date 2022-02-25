const initialState = {
    heroes: [],
    sortedHeroes: [],
    heroesLoadingStatus: 'idle',
    option: [],
    activeBtn: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_DELETING':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_ADDED':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_BACKUP':
            return {
                ...state,
                heroesLoadingStatus: 'idle',
                sortedHeroes: action.payload
            }
        case 'OPTION_FETCHED':
            return {
                ...state,
                option: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'FILTERING_VALUE':
            return {
                ...state,
                heroesLoadingStatus: 'idle',
                activeBtn: action.payload
            }
        case 'FILTERED_HEROES':
            return {
                ...state,
                heroesLoadingStatus: 'idle',
                heroes: action.payload
            }
        default: return state
    }
}

export default reducer;