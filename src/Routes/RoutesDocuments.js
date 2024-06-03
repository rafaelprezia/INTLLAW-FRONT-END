import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getDocumentsByID } from '../Services/DocumentsServices.js';
import { useParams } from 'react-router-dom'; 

const DocumentsContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFFFFF;
    width: calc(100% - 20px);
    min-height: 70vh;
    padding: 10px;
    margin-bottom: 18vh;
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
    
    return (
        <DocumentsContainer>
            {!document ? (
                <></>
            ) :
                <h1>{document.title}</h1>
            }
        </DocumentsContainer>
        
    );
}

export default Document;
