import styled from 'styled-components';
import SearchDocuments from '../Components/SearchDocuments.js'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDocuments } from '../Services/DocumentsServices.js';
import SearchBar from '../Components/SearchBar.js';

const SearchContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    min-height: 70vh;
    background-color: #FFFFFF;
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

function Search() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const query = searchParams.get('query');
    const title = searchParams.get('title');
    const date = searchParams.get('date');
    const parties = searchParams.get('parties');
    const category = searchParams.get('category');
    const tags = searchParams.get('tags');

    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            setLoading(true);
            const fetchedDocuments = await getDocuments(query, title, date, parties, category, tags);
            setDocuments(fetchedDocuments);
            setLoading(false);
        };

        fetchDocuments();
    }, [query, title, date, parties, category, tags]);

    return (
        <SearchContainer>
            <SearchBar/>

            { loading ? (
                <></>
            ) : documents.length !== 0 ? (
                documents.map(document => (
                    <SearchDocuments 
                        key={document._id}
                        title={document.title} 
                        date={document.date}
                        partiesInvolved={document.partiesInvolved} 
                        category={document.category} 
                        tags={document.tags}  
                        id={document._id}
                        content= {document.content}
                    />
                ))
            ) : (
                <NoDocuments><Text>No documents found</Text></NoDocuments>
            )}
        </SearchContainer>
    );
}

export default Search;
