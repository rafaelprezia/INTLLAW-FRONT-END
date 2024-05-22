import { useState } from 'react';
import styled from 'styled-components';
import { createDocument } from '../Services/DocumentsServices';

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f5f5f5;
    border: 1px solid #cccccc;
    border-radius: 5px;
    width: 60%;
    margin: auto;
    margin-top: 50px;
    margin-bottom: 30vh;
    height: calc(100vh - 100px); 
    overflow-y: auto; 
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #cccccc;
    border-radius: 5px;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #cccccc;
    border-radius: 5px;
    height: 150px;
    resize: none;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const KeywordContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const KeywordField = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin: 5px 0;
`;

const KeywordInput = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 5px;
`;

const RemoveButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    background: none;
    border: none;
    color: #FF0000;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        color: #cc0000;
    }
`;

const AddKeyWordContainer = styled.section`
    display: flex;
    justify-content: flex-end;
    padding: 10px;
`;

const CreateDocumentContainer = styled.section`
    display: flex;
    justify-content: center;
`;

const ConfirmationMessage = styled.div`
    background-color: #28a745;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
    text-align: center;
`;

function DocumentForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [text, setText] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const filteredKeywords = keywords.filter(keyword => keyword.trim() !== '');
        const documentData = { title, description, keyWords: filteredKeywords, text };
        
        try {
            await createDocument(documentData);
            setShowConfirmation(true);
            setTimeout(() => setShowConfirmation(false), 3000);

        } catch (error) {
            console.error('Error: ', error);
        }
    };
    

    const handleKeywordChange = (index, event) => {
        const newKeywords = [...keywords];
        newKeywords[index] = event.target.value.replace(/\s+/g, '');
        setKeywords(newKeywords);
    };

    const addKeywordField = () => {
        setKeywords([...keywords, '']);
    };

    const removeKeywordField = (index) => {
        const newKeywords = keywords.filter((_, i) => i !== index);
        setKeywords(newKeywords);
    };

    const handleKeyDown = (event) => {
        if (event.key === ' ') {
            event.preventDefault();
        }
    };

    return (
        <FormContainer>
            <h1>Create New Document</h1>
            <form onSubmit={handleSubmit}>
                <Input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
                <Input 
                    type="text" 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
                <TextArea 
                    placeholder="Text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    required 
                />
                <KeywordContainer>
                    {keywords.map((keyword, index) => (
                        <KeywordField key={index}>
                            <KeywordInput
                                type="text"
                                placeholder="Keyword"
                                value={keyword}
                                onChange={(e) => handleKeywordChange(index, e)}
                                onKeyDown={handleKeyDown}
                            />
                            <RemoveButton type="button" onClick={() => removeKeywordField(index)}>
                                &times;
                            </RemoveButton>
                        </KeywordField>
                    ))}
                </KeywordContainer>

                <AddKeyWordContainer>
                    <Button type="button" onClick={addKeywordField}>Add Keyword</Button>
                </AddKeyWordContainer>

                <CreateDocumentContainer>
                    <Button type="submit">Create Document</Button>
                </CreateDocumentContainer>

                {showConfirmation && <ConfirmationMessage>Document created successfully!</ConfirmationMessage>}
            </form>
        </FormContainer>
    );
}

export default DocumentForm;
