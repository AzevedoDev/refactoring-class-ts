import {useRef} from 'react';
import {FiCheckSquare} from 'react-icons/fi';
import {FormHandles, SubmitHandler} from '@unform/core'
import {Form} from './styles';
import Modal from '../Modal';
import Input from '../Input';
import {FoodTypes} from "../../pages/Dashboard";

type ModalEditFoodTypes = {
    isOpen: boolean, setIsOpen: () => void, editingFood: FoodTypes | undefined, handleUpdateFood: (data: any) => void
}

function ModalEditFood(props: ModalEditFoodTypes) {
    const formRef = useRef<FormHandles>(null)
    const {isOpen, setIsOpen, editingFood, handleUpdateFood} = props;


    const handleSubmit: SubmitHandler<FormData> = async data => {
        handleUpdateFood(data);
        setIsOpen();
    };


    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
                <h1>Editar Prato</h1>
                <Input name="image" placeholder="Cole o link aqui"/>

                <Input name="name" placeholder="Ex: Moda Italiana"/>
                <Input name="price" placeholder="Ex: 19.90"/>

                <Input name="description" placeholder="Descrição"/>

                <button type="submit" data-testid="edit-food-button">
                    <div className="text">Editar Prato</div>
                    <div className="icon">
                        <FiCheckSquare size={24}/>
                    </div>
                </button>
            </Form>
        </Modal>
    );
}

export default ModalEditFood;
