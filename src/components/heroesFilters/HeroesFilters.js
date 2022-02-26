import { useMemo } from "react";
import { connect } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import * as actions from "../../actions";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = ({heroes, sortedHeroes, option, activeBtn, heroesFetched, filteringValue, filteredHeroes, heroesFetchingError}) => {

    const {request} = useHttp();

    const loadingHero = () => {
        request("http://localhost:3001/heroes")
            .then(data => heroesFetched(data))
            .catch(() => heroesFetchingError())
    }

    const filtering = (e) => {
        const newListHeroes = heroes.filter(item => item.element === e.target.id);
        switch(e.target.id) {
            case 'all':
                loadingHero();
                filteringValue(e.target.id)
                filteredHeroes(sortedHeroes)
                break;
            case 'fire':
                filteringValue(e.target.id)
                filteredHeroes(newListHeroes)
                break;
            case 'water':
                filteringValue(e.target.id)
                filteredHeroes(newListHeroes)
                break;
            case 'wind':
                filteringValue(e.target.id)
                filteredHeroes(newListHeroes)
                break;
            case 'earth':
                filteringValue(e.target.id)
                filteredHeroes(newListHeroes)
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

    const btns = useMemo(() => creatingBtns(), [heroes, option, activeBtn]);
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

const mapStateToProps = state => {
    return {
        ...state,
    }
}

export default connect(mapStateToProps, actions)(HeroesFilters);