import styled from 'styled-components';
import SearchBar from '../Components/SearchBar.js';
import SearchDocuments from '../Components/SearchDocuments.js'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDocuments } from '../Services/DocumentsServices.js'

const SearchContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    background-color: #FFFFFF;
    gap: 20px;
    margin-bottom: 18vh;
`
const SearchBarContainer = styled.section`
    display: flex;
    justify-content: center;
`

const NoDocuments = styled.section`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #FFFFFF;
    margin-bottom: 18vh;
`

const Text = styled.p`
    font-family: 'Inter';
    font-size: 36px;
    color: #000000; 
    padding: 5px;
`;

function Search(){

    const { query } = useParams();

    const [documents, setDocuments] = useState([])

    useEffect(() => {

        async function fetchDocuments(){
            setDocuments(await getDocuments(query))
        }

        fetchDocuments()
      }, [query])

    return (
        <SearchContainer>
            <SearchBarContainer>
                <SearchBar placeholder='Below is what our search engine found... Type here for a new search.'/>
            </SearchBarContainer>
            
            { documents.length !== 0 ? documents.map( document => (
            <SearchDocuments 
                title={document.title} 
                preview={truncateText(document.description, 700)} 
                id={document._id}
            />
            )) : <NoDocuments><Text>No documents found</Text></NoDocuments>}
        </SearchContainer>
    );
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    } else {
        return text.substring(0, maxLength) + '...'; 
    }
}

export default Search;