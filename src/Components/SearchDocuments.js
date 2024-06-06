import styled from 'styled-components';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import StyledTags from './StyledTags.js';
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { deleteDocuments } from '../Services/DocumentsServices.js';

const StyledCard = styled(Card)`
  margin-bottom: 1rem;
  padding: 20px;
  border: none;
`;

const StyledCardHeader = styled(Card.Header)`
    display: flex;
    justify-content: space-between;
    background-color: #6c757d; 
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: .25rem;
`;

const StyledHeaderContent = styled.section`
    display: flex;
    flex-direction: column;
    color: #fff; 
`

const StyledHeaderIcons = styled.section`
    display: flex;
    gap: 20px;
    font-size: 24px;
    color: #ffffff;
`

const StyledCardBody = styled(Card.Body)`
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: .25rem;
`;

const ReadMoreButton = styled(Button)`
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
    width: 100%;
    margin-top: 1rem;

    &:hover {
        background-color: #6c757d;
        border-color: #6c757d;
        color: #212529; 
    }
`;

const handleEditClick = () => {
    console.log("Edit icon clicked");
  };
  
  const handleDeleteClick = (id) => {
    deleteDocuments(id);
  };

function SearchDocuments({title, date, partiesInvolved, category, tags, id, content}){

    const Usuario = true;
  
    return(
            <StyledCard>
                <StyledCardHeader>
                    <StyledHeaderContent>
                        <h5>{title}</h5>
                        <p>{date.substring(0, 10)}</p>
                    </StyledHeaderContent>
                    {Usuario ? (
                        <StyledHeaderIcons>
                            <FiEdit style={{ cursor: 'pointer' }} onClick={() => handleEditClick}/>
                            <MdDelete style={{ cursor: 'pointer' }} onClick={() => handleDeleteClick(id)}/>
                        </StyledHeaderIcons>
                    ) : (
                        <></>
                    )}
                </StyledCardHeader>
                <StyledCardBody>
                    <p><strong>Parties Involved:</strong> {partiesInvolved}</p>
                    <p><strong>Category:</strong> {category}</p>
                    <StyledTags tags={tags}/>
                    <p>{stripHtml(content)}</p>
                    <Link to={`/search/document/${id}`}>
                        <ReadMoreButton>
                            Read More
                        </ReadMoreButton>
                    </Link>
                </StyledCardBody>
            </StyledCard>
    );
}

function stripHtml(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    var text = tmp.textContent || tmp.innerText || "";
 
    var lines = text.split('\n');
    if (lines.length > 4) {
        lines = lines.slice(0, 4);
    }
 
    return lines.join('\n');
}

export default SearchDocuments;