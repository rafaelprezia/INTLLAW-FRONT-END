import styled from 'styled-components';
import { Link } from 'react-router-dom'

const SearchDocumentsContainer = styled.section`
    display: flex;
    flex-direction: column;
    font-family: 'Arial', sans-serif;
    background-color: #FFFFFF;
    width: calc(100vw - 20px);
    padding: 20px;
`
const Document = styled.section`
    border: 1px solid;
`

const Header = styled.section`
    display: flex;
    flex-direction: column;
    background-color: #10222e;
    width: 100%;
    color: white;
    padding: 10px 10px 0px 10px;
`

const Content = styled.section`
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    width: 100%;
    color: black;
    padding: 10px;
`

const StyledKeyWords = styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100% ;
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

function SearchDocuments({title, date, partiesInvolved, category, tags, id}){
    return(
        <Link to={`/search/document/${id}`}>
            <SearchDocumentsContainer>
                <Document>
                    <Header>
                        <h1>{title}</h1>
                        <p>{date.substring(0, 10)}</p>
                    </Header>

                    <Content>
                        <p><strong>Parties Involved: </strong> {partiesInvolved}</p>
                        <p><strong>Category: </strong> {category}</p>
                        <p><strong>Tags: </strong></p>

                        <StyledKeyWords>
                                {Array.isArray(tags) && tags.length > 0 ? (
                                    tags.map((keyword, index) => (
                                        <KeywordTag>{keyword}</KeywordTag>
                                    ))
                                ) : (
                                    <p>No tags available</p>
                                )}
                        </StyledKeyWords>
                    </Content>
                </Document>
            </SearchDocumentsContainer>
        </Link>
    );
}

export default SearchDocuments;