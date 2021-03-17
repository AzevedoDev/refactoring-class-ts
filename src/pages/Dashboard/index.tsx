import {useEffect, useState} from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import {FoodsContainer} from './styles';

export type FoodTypes = {
    id: number
    name: string
    description: string
    price: string
    available: boolean
    image: string
}

function Dashboard() {
    const [foods, setFood] = useState<Array<FoodTypes>>([])
    const [editingFood, setEditingFood] = useState<FoodTypes>()
    const [modalOpen, setModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)

    useEffect(() => {
        async function getFoods() {
            const {data} = await api.get('/foods');

            setFood(data);
        }

        getFoods()
    }, [])


    const handleAddFood = async (food: FoodTypes) => {

        try {
            const response = await api.post('/foods', {
                ...food,
                available: true,
            });
            setFood([...foods, response.data]);
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdateFood = async (food: FoodTypes) => {
        try {
            const foodUpdated = await api.put(
                `/foods/${editingFood?.id}`,
                {...editingFood, ...food},
            );

            const foodsUpdated = foods.map(f =>
                f.id !== foodUpdated.data.id ? f : foodUpdated.data,
            );

            setFood(foodsUpdated);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeleteFood = async (id: number) => {
        await api.delete(`/foods/${id}`);

        const foodsFiltered = foods.filter(food => food.id !== id);

        setFood(foodsFiltered);
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    const toggleEditModal = () => {
        setEditModalOpen(!editModalOpen);
    }

    const handleEditFood = (food:FoodTypes) => {
        setEditingFood(food);
        setEditModalOpen(true)
    }


    return (
        <>
            <Header openModal={toggleModal}/>
            <ModalAddFood
                isOpen={modalOpen}
                setIsOpen={toggleModal}
                handleAddFood={handleAddFood}
            />
            <ModalEditFood
                isOpen={editModalOpen}
                setIsOpen={toggleEditModal}
                editingFood={editingFood}
                handleUpdateFood={handleUpdateFood}
            />

            <FoodsContainer data-testid="foods-list">
                {foods && foods.map(food => (
                    <Food
                        key={food.id}
                        food={food}
                        handleDelete={handleDeleteFood}
                        handleEditFood={handleEditFood}
                    />
                ))}
            </FoodsContainer>
        </>
    );
};

export default Dashboard;
