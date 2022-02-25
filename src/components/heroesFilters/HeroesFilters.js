import { useEffect } from "react";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filteringValue, filteredHeroes, heroesBackup } from "../../actions";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const {heroes, sortedHeroes, option, activeBtn} = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (activeBtn === 'all') {
            dispatch(heroesBackup(heroes));
        }
    }, [heroes])

    const filtering = (e) => {
        const newListHeroes = heroes.filter(item => item.element === e.target.id);
        switch(e.target.id) {
            case 'all':
                dispatch(filteringValue(e.target.id));
                dispatch(filteredHeroes(sortedHeroes));
                break;
            case 'fire':
                dispatch(filteringValue(e.target.id));
                dispatch(filteredHeroes(newListHeroes));
                break;
            case 'water':
                dispatch(filteringValue(e.target.id));
                dispatch(filteredHeroes(newListHeroes));
                break;
            case 'wind':
                dispatch(filteringValue(e.target.id));
                dispatch(filteredHeroes(newListHeroes));
                break;
            case 'earth':
                dispatch(filteringValue(e.target.id));
                dispatch(filteredHeroes(newListHeroes));
                break;
            default:
                throw Error();
        }
    }

    const creatingBtns = () => {
        return option.map(({value, text, className}, i) => {
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

    const btns = useMemo(() => creatingBtns(), [option, activeBtn]);
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