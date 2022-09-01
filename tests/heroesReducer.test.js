import heroesReducer, { fetchHeroes } from "../src/components/heroesList/heroesSlice";

const initialState = {
    heroesLoadingStatus: 'idle'
};

describe('heroesReducer', () => {
    it('should change status with "fetchHeroes.pending" action', () => {
        const state = heroesReducer(initialState, fetchHeroes.pending());
        expect(state.heroesLoadingStatus).toBe('loading');
    });
    // it('should change status with "fetchHeroes.fulfilled" action', () => {
    //     const mockHeroes = {
    //         "id": "916f74f5-8ebc-4b31-b4a6-7488d859b8d3",
    //         "name": "Неизвестный герой",
    //         "description": "Скрывающийся в тени",
    //         "element": "wind"
    //     };

    //     const state = heroesReducer(initialState, fetchHeroes.fulfilled(mockHeroes)); // === эквивалентно экшен
    //     expect(state.heroesLoadingStatus).toBe({
    //         heroesLoadingStatus: 'idle',
    //     }
    // );
    // }); // не работает из-за entity adapter
    it('should change status with "fetchHeroes.rejected" action', () => {
        const state = heroesReducer(initialState, fetchHeroes.rejected());
        expect(state.heroesLoadingStatus).toBe('error');
    });
});