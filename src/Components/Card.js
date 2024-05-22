import styled from 'styled-components';
import { Link } from 'react-router-dom'

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    height: 140px;
    border-radius: 3px;
    justify-content: center;
    align-items: center;
    border: 1px solid #E0E0E0;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
        transform: translateY(-5px); 
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); 
    }
`;

const Image = styled.img`
    width: 60%; 
    height: auto; 
    display: flex;
    justify-self: center;
`;

function Card({ imageSrc, text }) {
    return (
        <Link to={`/search/${text.toLowerCase()}`}>
            <CardContainer>
                <Image src={imageSrc} alt='error'/>
                <p>{text}</p>
            </CardContainer>
        </Link>
    );
}

export default Card;