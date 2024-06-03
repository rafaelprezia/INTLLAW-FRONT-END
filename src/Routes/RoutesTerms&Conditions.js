import styled from 'styled-components';

const TermsConditionsContainer = styled.section`
    display: flex;
    background-color: #FFFFFF;
    width: 100vw;
    min-height: 70vh;
`

function TermsConditions(){
      
    return (
        <TermsConditionsContainer>
            <h1>Terms and Conditions</h1>
        </TermsConditionsContainer>
    );
}

export default TermsConditions;