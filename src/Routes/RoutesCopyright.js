import styled from 'styled-components';

const CopyrightContainer = styled.section`
    display: flex;
    background-color: #FFFFFF;
    min-height: 70vh;
`

function Copyright(){
    
    return (
        <CopyrightContainer>
            <h1>Copyright</h1>
        </CopyrightContainer>
    );
}

export default Copyright;