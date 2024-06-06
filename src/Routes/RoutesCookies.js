import styled from 'styled-components';

const CookiesContainer = styled.section`
    display: flex;
    background-color: #FFFFFF;
    min-height: 70vh;
`

function Cookies(){
    
    return (
        <CookiesContainer>
            <h1>Cookies</h1>
        </CookiesContainer>
    );
}

export default Cookies;
