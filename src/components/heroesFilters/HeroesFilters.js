import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filteringValue, selectAll } from "./filtersSlice";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const {activeBtn} = useSelector(state => state.filters);
    const filter = useSelector(selectAll);
    console.log(filter);
    const dispatch = useDispatch();

    const filtering = (e) => {
        if (e.target.id) {
            dispatch(filteringValue(e.target.id));
        } else {
            throw Error('Incorrect id');
        }
        
    }

    const creatingBtns = () => {
        return filter.map(({value, text, className}, i) => {
                return ( 
                    <button id={value} 
                        onClick={filtering} 
                        key={i} 
                        className={activeBtn === value ? `${className} active` : `${className}`}
                        >
                        {text}
                    </button>
                )
        });
    }

    const btns = useMemo(() => creatingBtns(), [filter, activeBtn]);
    // получить стейт фильтр и heroes
    // получить данные про фильтр с сервака и записать в стейт
    // в зависимости от поля элемент в хероес, отображать тех или иных героев
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {btns}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;