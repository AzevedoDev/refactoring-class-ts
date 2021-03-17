import {FiPlusSquare} from 'react-icons/fi';

import {Container} from './styles';
import Logo from '../../assets/logo.svg';

type HeaderTypes = { openModal: () => void }

function Header(props:HeaderTypes) {
    const {openModal} = props;

    return (
        <Container>
            <header>
                <img src={Logo} alt="GoRestaurant"/>
                <nav>
                    <div>
                        <button
                            type="button"
                            onClick={openModal}
                        >
                            <div className="text">Novo Prato</div>
                            <div className="icon">
                                <FiPlusSquare size={24}/>
                            </div>
                        </button>
                    </div>
                </nav>
            </header>
        </Container>
    )
}

export default Header;
