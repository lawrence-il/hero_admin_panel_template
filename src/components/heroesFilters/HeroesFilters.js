import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filteringValue, fetchFilter, selectAll } from "./filtersSlice";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const {activeBtn} = useSelector(state => state.filters);
    const filter = useSelector(selectAll);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilter())
    }, [])

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
