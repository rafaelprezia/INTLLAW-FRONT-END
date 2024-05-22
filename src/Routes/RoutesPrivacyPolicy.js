import styled from 'styled-components';

const PrivacyPolicyContainer = styled.section`
    display: flex;
    background-color: #FFFFFF;
    height:70vh;
`

function PrivacyPolicy(){
    return (
        <PrivacyPolicyContainer>
            <h1>Privacy Policy</h1>
        </PrivacyPolicyContainer>
    );
}

export default PrivacyPolicy;