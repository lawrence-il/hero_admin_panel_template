const initialState = {
    option: [],
    activeBtn: 'all'
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'OPTION_FETCHED':
            return {
                ...state,
                option: action.payload,
            }
        case 'FILTERING_VALUE':
            return {
                ...state,
                activeBtn: action.payload
            }
        case 'FILTERED_HEROES':
            return {
                ...state,
                heroes: action.payload
            }
        default: return state
    }
}

export default filters;