import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = ({heroes, activeBtn, heroesLoadingStatus, heroesFetching, heroesFetched, heroesFetchingError, heroesDeleting}) => {

    const {request} = useHttp();
    
    useEffect(() => {
        heroesFetching(); // actionCreators обёрнутый в диспетч
        loadingHero();
        // eslint-disable-next-line
    }, []);

    const loadingHero = () => {
        request("http://localhost:3001/heroes")
            .then(data => heroesFetched(data))
            .catch(() => heroesFetchingError())
    }


    const deletingHero = (e) => {
        const newListHeroes = heroes.filter(item => item.id !== e.target.id);
        request(`http://localhost:3001/heroes/${e.target.id}`, 'DELETE')
            .then(() => heroesDeleting(newListHeroes))
        
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            if (props.element !== activeBtn && activeBtn !== 'all') {
                console.log(activeBtn);
                return null;
            }
            return <HeroesListItem 
                        key={id} 
                        {...props}
                        id={id}
                        deletingHero={deletingHero}/>
        })
    }

    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

const mapStateToProps = state => {
    return {
        ...state,
        heroes: state.heroes,
        heroesLoadingStatus: state.heroesLoadingStatus
    }
}

export default connect(mapStateToProps, actions)(HeroesList);