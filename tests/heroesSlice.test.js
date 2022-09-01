import { fetchHeroes } from "../src/components/heroesList/heroesSlice";

global.fetch = jest.fn();


describe('heroesThunk', () => {
    it('should fetchHeroes with resolved responce', async () => {
        
        const mockHeroes = [{
            "id": "916f74f5-8ebc-4b31-b4a6-7488d859b8d3",
            "name": "Неизвестный герой",
            "description": "Скрывающийся в тени",
            "element": "wind"
        }];

        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockHeroes)
        });

        const dispatch = jest.fn();
        const thunk = fetchHeroes();

        await thunk(dispatch);//1

        const { calls } = dispatch.mock;

        expect(calls).toHaveLength(2);

        const [start, end] = calls;
       
        expect(start[0].type).toBe(fetchHeroes.pending().type); // это экшен без пайлоад
        expect(end[0].type).toBe(fetchHeroes.fulfilled().type); // === 'heroes/fetchHeroes/fulfilled'
        expect(end[0].payload).toBe(mockHeroes);

    // 1 function  fetchHeroes () {
    //     return function(dispatch, getState) {
    //          return data
    //      }    
    // }
    });

    it('should fetchHeroes with rejected responce', async () => {
        
        fetch.mockResolvedValue({
            ok: false
        });

        const dispatch = jest.fn();
        const thunk = fetchHeroes();

        await thunk(dispatch);//1

        const { calls } = dispatch.mock;
        
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(fetchHeroes.pending().type); // это экшен без пайлоад
        expect(end[0].type).toBe(fetchHeroes.rejected().type); // === 'heroes/fetchHeroes/fulfilled'
        expect(end[0].meta.requestStatus).toBe('rejected');
        
    });

});