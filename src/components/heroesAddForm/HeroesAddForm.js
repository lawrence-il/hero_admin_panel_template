import { useEffect, useMemo } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { fetchFilter, selectAll} from '../heroesFilters/filtersSlice';
import { heroesAdded } from '../heroesList/heroesSlice';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const filter = useSelector(selectAll);
    const {request} = useHttp();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilter(request))
        // eslint-disable-next-line
    }, []);

    const addingHeroes = (values, resetForm) => {
        values = {id: uuidv4(), ...values};
        dispatch(heroesAdded(values));
        request(`https://json-server-heroku1.herokuapp.com/heroes`, 'POST', JSON.stringify(values));
        resetForm();
    }   

    const creatingOption =  () => {
        const options = [];
        for (let i = 0; i <= filter.length - 1; i++) {
            if (filter[i].text === 'Все') continue;
            options[i] = <option 
                            key={i} 
                            value={filter[i].value}
                            >
                                {filter[i].text}
                        </option>
        }
        return options;
    } 
    
    // eslint-disable-next-line
    const options = useMemo(() => creatingOption(), [filter]);

    return (
        <Formik
            initialValues={
                {

                    name: '',
                    description: '',
                    element: '',

                }
            }
            onSubmit={(values, {resetForm}) => addingHeroes(values, resetForm)}
        >
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Как меня зовут?"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label fs-4">Описание</label>
                    <Field
                        name="description" 
                        className="form-control" 
                        id="desc" 
                        placeholder="Что я умею?"
                        as='textarea'
                        style={{"height": '130px'}}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field
                        className="form-select" 
                        id="element" 
                        name="element"
                        as="select">
                        <option value="">Я владею элементом...</option>
                        {options}
                    </Field>
                </div>

                <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;