import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { heroesFetching, heroesFetched, heroesFetchingError, heroesDeleting } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import '../../components/heroesList/heroesList.sass'

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    const {heroes, heroesLoadingStatus} = useSelector(state => state.heroes);
    const {activeBtn} = useSelector(state => state.filters);

    const dispatch = useDispatch();
    const {request} = useHttp();
    
    useEffect(() => {
        dispatch(heroesFetching());
        loadingHero();
        // eslint-disable-next-line
    }, []);

    const loadingHero = () => {
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
    }


    const deletingHero = (e) => {
        const newListHeroes = heroes.filter(item => item.id !== e.target.id);  // фильтрую массив чтобы убрать лишнего героя
        dispatch(heroesDeleting(newListHeroes)); // удаляю героя из heroes
        request(`http://localhost:3001/heroes/${e.target.id}`, 'DELETE');
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (heroes) => {
        let list = [];
        for (let i = 0; i <= heroes.length - 1; i++) {
            if (heroes[i].element !== activeBtn && activeBtn !== 'all') {
                continue;
            } else {
                list.push(<CSSTransition
                                    key={heroes[i].id}
                                    timeout={500}
                                    classNames="item"
                                >
                                <HeroesListItem 
                                    {...heroes[i]}
                                    id={heroes[i].id}
                                    deletingHero={deletingHero}
                                />
                            </CSSTransition>)
            }
        }
        if (list.length === 0) {
            list.push(<CSSTransition
                            key={1}
                            timeout={500}
                            classNames="item"
                        >
                            <h5 className="text-center mt-5">Героев пока нет</h5>
                        </CSSTransition>
            )
        }
        return list;
}
    
    const heroesList = renderHeroesList(heroes);
    return (
        <TransitionGroup>
            {heroesList}
        </TransitionGroup>
    )
}

export default HeroesList;