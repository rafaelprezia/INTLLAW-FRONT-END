import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getDocumentsByID } from '../Services/DocumentsServices.js';
import { useParams } from 'react-router-dom'; 
import DOMPurify from 'dompurify'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import StyledTags from '../Components/StyledTags.js';

const StyledContainer = styled(Container)`
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  min-height: 70vh;
  background-color: #FFFFFF;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const StyledCard = styled(Card)`
  width: 75%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
`;

const StyledCardHeader = styled(Card.Header)`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000000;
    margin-bottom: 0;
    background-color: rgba(0, 0, 0, .03);
    border-bottom: 1px solid rgba(0, 0, 0, .125);
`;

const StyledCardBody = styled(Card.Body)`
    display: flex;
    flex-direction: column;
    align-items: left;
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: .25rem;
`;

const ContentContainer = styled.div`
    padding: 20px;
    border: 0.5px solid rgba(0, 0, 0, .125);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: .25rem;
    margin-bottom: 10px;
    line-height: 1.6;

    h1, h2, h3, h4, h5, h6 {
        margin-top: 20px;
        margin-bottom: 10px;
    }

    p {
        margin-bottom: 10px;
    }

    ul, ol {
        margin-bottom: 10px;
        padding-left: 20px;
    }

    .signature-line {
        margin-top: 20px;
        margin-bottom: 5px;
    }

    .signature-name {
        font-weight: bold;
    }
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
        <StyledContainer>
            {!document ? (
                <></>
            ) : (
                <StyledCard>
                    <StyledCardHeader>
                        <h2>{document.title}</h2>
                        <p>{document.date.substring(0, 10)}</p>
                    </StyledCardHeader>
                    <StyledCardBody>
                        <p><strong>Parties Involved: </strong>{document.partiesInvolved}</p>
                        <p><strong>Category: </strong>{document.category}</p>
                        <ContentContainer>
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(document.content) }} />
                        </ContentContainer>
                        <p><strong>Tags:</strong></p>
                        <StyledTags tags={document.tags}/>
                    </StyledCardBody>
                </StyledCard>
            )}
        </StyledContainer>
    );
}

export default Document;
