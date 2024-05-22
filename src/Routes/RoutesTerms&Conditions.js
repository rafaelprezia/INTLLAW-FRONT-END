import styled from 'styled-components';

const TermsConditionsContainer = styled.section`
    display: flex;
    background-color: #FFFFFF;
    height:70vh;
`

function TermsConditions(){
    return (
        <TermsConditionsContainer>
            <h1>Terms & Conditions</h1>
        </TermsConditionsContainer>
    );
}

export default TermsConditions;
