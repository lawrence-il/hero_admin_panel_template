export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesDeleting = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesAdded = (heroes) => {
    return {
        type: 'HEROES_ADDED',
        payload: heroes
    }
}

export const optionFetched = (option) => {
    return {
        type: 'OPTION_FETCHED',
        payload: option
    }
}

export const filteringValue = (value) => {
    return {
        type: 'FILTERING_VALUE',
        payload: value,
    }
}

export const filteredHeroes = (newListHeroes) => {
    return {
        type: 'FILTERED_HEROES',
        payload: newListHeroes,
    }
}
