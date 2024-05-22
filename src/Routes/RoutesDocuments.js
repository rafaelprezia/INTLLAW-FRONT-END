import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getDocumentsByID } from '../Services/DocumentsServices.js';
import { useParams, Link } from 'react-router-dom'; 

const DocumentsContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFFFFF;
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 18vh;
`;

const StyledKeyWords = styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: calc(100% - 20px);
    padding: 10px;
`;

const KeywordTag = styled.span`
    background-color: #e0e0e0;
    color: #000000;
    border-radius: 12px;
    padding: 5px 10px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
    cursor: pointer; 
`;

const DescriptionContainer = styled.section`
    width: calc(100% - 20px);
    padding: 10px;
    text-align: justify;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #333333;
`;

function Document() {
    const { id } = useParams();
    const [document, setDocument] = useState(null);

    useEffect(() => {
        async function fetchDocument() {
            const fetchedDocument = await getDocumentsByID(id);
            setDocument(fetchedDocument);
        }
        fetchDocument();
    }, [id]);

    if (!document) {
        return <p>Loading...</p>;
    }

    return (
        <DocumentsContainer>
            <h1>{document.title}</h1>
            <DescriptionContainer>
                {document.description}
            </DescriptionContainer>
            <StyledKeyWords>
                {Array.isArray(document.keyWords) && document.keyWords.length > 0 ? (
                    document.keyWords.map((keyword, index) => (
                        <Link key={index} to={`/search/${keyword}`}>
                            <KeywordTag>{keyword}</KeywordTag>
                        </Link>
                    ))
                ) : (
                    <p>No keywords available</p>
                )}
            </StyledKeyWords>
        </DocumentsContainer>
    );
}

export default Document;
