import {useState} from 'react';
import {FiEdit3, FiTrash} from 'react-icons/fi';

import {Container} from './styles';
import api from '../../services/api';
import {FoodTypes} from "../../pages/Dashboard";


type Props = {
    food: FoodTypes
    handleDelete: (foodId: number) => void
    handleEditFood: (food:FoodTypes) => void
}

function Food(props: Props) {
    const [state, setState] = useState({isAvailable: false})
    const {isAvailable} = state
    const {handleDelete, food} = props

    const toggleAvailable = async () => {
        const {food} = props;
        const {isAvailable} = state;

        await api.put(`/foods/${food.id}`, {
            ...food,
            available: !isAvailable,
        });

        setState({isAvailable: !isAvailable});
    }

    const setEditingFood = () => {
        const {food, handleEditFood} = props;

        handleEditFood(food);
    }
    return (
        <Container available={isAvailable}>
            <header>
                <img src={food.image} alt={food.name}/>
            </header>
            <section className="body">
                <h2>{food.name}</h2>
                <p>{food.description}</p>
                <p className="price">
                    R$ <b>{food.price}</b>
                </p>
            </section>
            <section className="footer">
                <div className="icon-container">
                    <button
                        type="button"
                        className="icon"
                        onClick={setEditingFood}
                        data-testid={`edit-food-${food.id}`}
                    >
                        <FiEdit3 size={20}/>
                    </button>

                    <button
                        type="button"
                        className="icon"
                        onClick={() => handleDelete(food.id)}
                        data-testid={`remove-food-${food.id}`}
                    >
                        <FiTrash size={20}/>
                    </button>
                </div>

                <div className="availability-container">
                    <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

                    <label htmlFor={`available-switch-${food.id}`} className="switch">
                        <input
                            id={`available-switch-${food.id}`}
                            type="checkbox"
                            checked={isAvailable}
                            onChange={toggleAvailable}
                            data-testid={`change-status-food-${food.id}`}
                        />
                        <span className="slider"/>
                    </label>
                </div>
            </section>
        </Container>
    );
}

export default Food;
