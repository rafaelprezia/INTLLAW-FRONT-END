import styled from 'styled-components'
import Logo from '../Images/Logo.png'
import { Link } from 'react-router-dom'

const HeaderContainer = styled.header`
    display: flex;
    width: 100%;
    height: 15vh;
    justify-content: space-between; 
    background-color: #10222E;
`

const Image = styled.img`
    height: 100%; 
    width: auto; 
`
const Text = styled(Link)`
    color: #ffffff;
    margin-top: 20px;
    margin-right: 30px;
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

function Header(){
    return(
            <HeaderContainer>
                <Link to="/">
                    <Image src={Logo} alt='Erro'/>
                </Link>
                <Text>Login</Text>
            </HeaderContainer>
    );
}

export default Header;