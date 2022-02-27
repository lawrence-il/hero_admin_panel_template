import { useHttp } from '../../hooks/http.hook'
import { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filteringValue, filteredHeroes, heroesFetched,  heroesFetchingError, heroesBackup } from "../../actions";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const {heroes, option, activeBtn, backupHeroes} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    // Без бекапа не работает правильно фильтрация. 
    // После выбора первый раз фильтра другие фильтры, кроме all, не работают
    // т.к heroes перезаписывается
    // Бекап heroes, фильтрация происходит по бекапу
    useEffect(() => {
        if (activeBtn === 'all') dispatch(heroesBackup(heroes));
    }, [heroes]);

    // const loadingHero = () => {
    //     request("http://localhost:3001/heroes")
    //         .then(data => dispatch(heroesFetched(data)))
    //         .catch(() => dispatch(heroesFetchingError()))
    // }

    const filtering = (e) => {
        const newListHeroes = backupHeroes.filter(item => item.element === e.target.id);
        switch(e.target.id) {
            case 'all':
                // loadingHero();
                dispatch(filteringValue(e.target.id));
                dispatch(filteredHeroes(backupHeroes));
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

    const btns = useMemo(() => creatingBtns(), [heroes, option, backupHeroes]);
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