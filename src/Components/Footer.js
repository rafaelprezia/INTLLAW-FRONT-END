import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FooterContainer = styled.footer`
    display: flex;
    width: 100%;
    height: 15vh;
    background-color: #10222E;
    justify-content: center;
    padding: 10px;
`
const InformationContainer = styled.section`
    display: flex;
    width: 95vw;
    height: 100%;
    justify-content: space-between;
`
const Title = styled.section`
    width: 25vw;
    height: 100%;
    color: #ffffff;
`
const OptionsContainer = styled.section`
    width: 50vw;
    height: 100%;
    display: flex;
    color: #ffffff;
    justify-content: space-between;
    align-items: center;
    margin-right: 300px;
`

const Options = ['Privacy Policy', 'Cookies', 'Terms & Conditions', 'Copyright'];

const StyledLink = styled(Link)`
    color: #ffffff;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

function Footer(){
    return(
        <FooterContainer>
            <InformationContainer>
                <Link to="/">
                    <Title><h3>INTERNATIONALLY</h3></Title>
                </Link>
                <OptionsContainer>
                    {Options.map((Option, index) => (
                        <StyledLink key={index} to={`/${Option.toLowerCase().replace(/\s/g, '')}`}>
                            {Option}
                        </StyledLink>
                    ))}
                </OptionsContainer>
            </InformationContainer>
        </FooterContainer>
    );
}

export default Footer;
