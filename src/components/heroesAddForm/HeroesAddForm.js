import { useEffect, useMemo } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as actions from '../../actions';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = ({ option, heroesAdded, optionFetched }) => {

    const {request} = useHttp();

    useEffect(() => {
        loadingOptionData();
        
        // eslint-disable-next-line
    }, []);

    const addingHeroes = (value) => {
        value = {id: uuidv4(), ...value};
        heroesAdded(value)
        request(`http://localhost:3001/heroes`, 'POST', JSON.stringify(value));
    }
    
    const loadingOptionData = () => {
        request(`http://localhost:3001/chooseElement`)
                .then(data => optionFetched(data))
    }

    const creatingOption =  () => {
        const options = [];
        for (let i = 0; i <= option.length - 1; i++) {
            if (option[i].text === 'Все') continue;
            options[i] = <option 
                            key={i} 
                            value={option[i].value}
                            >
                                {option[i].text}
                        </option>
        }
        return options;
    } 
    
    // eslint-disable-next-line
    const options = useMemo(() => creatingOption(), [option]);

    return (
        <Formik
            initialValues={
                {

                    name: '',
                    description: '',
                    element: '',

                }
            }
            onSubmit={addingHeroes}
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

const mapStateToProps = state => {
    return {
        option: state.option
    }
}


export default connect(mapStateToProps, actions)(HeroesAddForm);