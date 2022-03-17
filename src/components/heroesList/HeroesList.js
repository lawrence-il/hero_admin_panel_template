import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { heroesDeleting, fetchHeroes, selectAll } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import '../../components/heroesList/heroesList.sass'

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    
    const {heroesLoadingStatus} = useSelector(state => state.heroes);
    const {activeBtn} = useSelector(state => state.filters);
    const heroes = useSelector(selectAll);
    const dispatch = useDispatch();
    const {request} = useHttp();
    
    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);


    const deletingHero = (id) => {
        const newListHeroes = heroes.filter(item => item.id !== id);  // фильтрую массив чтобы убрать лишнего героя
        dispatch(heroesDeleting(newListHeroes)); // удаляю героя из heroes
        request(`https://json-server-heroku1.herokuapp.com/heroes/${id}`, 'DELETE');
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (heroes) => {
        let list = [];
        for (let i = 0; i <= heroes.length - 1; i++) {
            if (heroes[i].element !== activeBtn && activeBtn !== 'all') { // для рендоринга только нужных элементов
                continue;
            } else {
                list.push(<CSSTransition
                                    key={heroes[i].id}
                                    timeout={500}
                                    classNames="item"
                                >
                                <HeroesListItem 
                                    {...heroes[i]}
                                    deletingHero={() => deletingHero(heroes[i].id)}
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