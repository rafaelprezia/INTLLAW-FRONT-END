import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledKeyWords = styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
    padding: 10px;
`;

const KeywordTag = styled.span`
    background-color: #e0e0e0;
    color: #000000;
    border-radius: 12px;
    padding: 5px 10px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    cursor: pointer; 
`;

function StyledTags({tags}){
    return(
    <StyledKeyWords>
        {Array.isArray(tags) && tags.length > 0 ? (
            tags.map((keyword) => (
                <Link to={`/search?title=&date=&parties=&category=&tags=${keyword}`}>
                    <KeywordTag>{keyword}</KeywordTag>
                </Link>
                
            ))
        ) : (
            <p>No tags available</p>
        )}
    </StyledKeyWords>
    );
}

export default StyledTags;