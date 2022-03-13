import {  useMemo } from 'react';
import {  useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useGetHeroesQuery,  useDeleteHeroMutation} from '../../api/apiSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import '../../components/heroesList/heroesList.sass'

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    
    const {
        data: heroes = [],
        isLoading,
        isError,
    } = useGetHeroesQuery();

    const [deleteHero] = useDeleteHeroMutation();

    const {activeBtn} = useSelector(state => state.filters);

    const deletingHero = (id) => {
        deleteHero(id);
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
    // eslint-disable-next-line
    const heroesList = useMemo(() => renderHeroesList(heroes), [heroes, activeBtn]);

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    return (
        <TransitionGroup>
            {heroesList}
        </TransitionGroup>
    )
}

export default HeroesList;