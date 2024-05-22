import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SearchDocumentsContainer = styled.section`
    display: flex;
    flex-direction: column;
    background-color: #F5F5F5;
    border: 1px solid #CCCCCC;
    height: 180px;
    width: calc(100% - 44px);
    justify-content: space-between;
    align-items: left; 
    padding: 20px;
    flex-grow: 1;
    cursor: pointer;
    margin: 0px 0px 0px 1px;
    transition: background-color 0.3s ease; 

    &:hover {
        background-color: #E0E0E0; 
    }
`

const Title = styled.h1`
    font-size: 24px; 
    margin-bottom: 10px; 
    margin: 0;
`;

const Preview = styled.p`
    font-size: 16px; 
    color: #666666; 
`;

const PreviewLabel = styled.span`
    font-size: 18px; 
    font-weight: bold;
    font-style: italic;
    color: #000000;
`;

function SearchDocuments({title, preview, id}){
    return(
        <Link to={`/search/document/${id}`}>
            <SearchDocumentsContainer>
                <Title>{title}</Title>
                <Preview>
                    <PreviewLabel>Preview: </PreviewLabel>
                    {preview}
                </Preview>
            </SearchDocumentsContainer>
        </Link>
    );
}

export default SearchDocuments;