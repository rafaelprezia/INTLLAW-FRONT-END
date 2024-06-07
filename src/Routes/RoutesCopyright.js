import { useState } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Editor } from '@tinymce/tinymce-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { postDocuments } from '../Services/DocumentsServices.js';

const StyledContainer = styled(Container)`
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const StyledRow = styled(Row)`
  display: flex;
  justify-content: center;
`;

const StyledCard = styled(Card)`
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
`;

const StyledFormGroup = styled(Form.Group)`
  margin-bottom: 1rem; 
`;

const PrimaryButton = styled(Button)`
  cursor: pointer;
  color: #fff;
  background-color: #10222e;
  border-color: #10222e;
  display: block;
  width: 100%;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    background-color: #0e1c25;
    border-color: #0e1c25;
  }
`;

const StyledKeyWords = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
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

const Notification = styled.div`
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
  color: ${props => (props.success ? 'green' : 'red')};
  background-color: ${props => (props.success ? '#d4edda' : '#f8d7da')};
  border-color: ${props => (props.success ? '#c3e6cb' : '#f5c6cb')};
`;

const LegalDocumentEditor = () => {
  const [documentTitle, setDocumentTitle] = useState('');
  const [documentDate, setDocumentDate] = useState('');
  const [documentParties, setDocumentParties] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [documentContent, setDocumentContent] = useState('');
  const [notification, setNotification] = useState({ message: '', success: false });

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (tagInput.trim() !== '') {
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
      }
    }
  };

  const handleTagClick = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  const handleEditorChange = (content) => {
    setDocumentContent(content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const documentData = {
      title: documentTitle,
      date: documentDate,
      partiesInvolved: documentParties,
      category: category,
      content: documentContent,
      tags: tags
    };
  
    try {
      await postDocuments(documentData);
      setNotification({ message: "Document saved successfully", success: true });
      setDocumentTitle('');
      setDocumentDate('');
      setDocumentParties('');
      setCategory('');
      setTags([]);
      setTagInput('');
      handleEditorChange('')
      
    } catch (error) {
      setNotification({ message: "Error saving document", success: false });
    }
  };

  return (
    <StyledContainer>
      <StyledRow>
        <Col lg={9} md={12} col={12}>
          <StyledCard>
            <FormControl
              type="text"
              id="document-title"
              placeholder="Enter Document Title"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
            />
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <StyledFormGroup>
                  <Form.Label htmlFor="document-date">Date:</Form.Label>
                  <FormControl
                    type="date"
                    id="document-date"
                    value={documentDate}
                    onChange={(e) => setDocumentDate(e.target.value)}
                  />
                </StyledFormGroup>
                <StyledFormGroup>
                  <Form.Label htmlFor="document-parties">Parties Involved:</Form.Label>
                  <FormControl
                    type="text"
                    id="document-parties"
                    placeholder="Enter Parties Involved"
                    value={documentParties}
                    onChange={(e) => setDocumentParties(e.target.value)}
                  />
                </StyledFormGroup>
                <StyledFormGroup>
                  <Form.Label htmlFor="category">Category:</Form.Label>
                  <Form.Control
                    as="select"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    <option value="Constitutions">Constitutions</option>
                    <option value="Criminal">Criminal</option>
                    <option value="Humanitarian">Humanitarian</option>
                    <option value="Diplomacy">Diplomacy</option>
                    <option value="Labour">Labour</option>
                    <option value="Human Rights">Human Rights</option>
                    <option value="Environmental">Environmental</option>
                    <option value="Maritime">Maritime</option>
                    <option value="Contracts">Contracts</option>
                    <option value="Immigration">Immigration</option>
                  </Form.Control>
                </StyledFormGroup>
                <StyledFormGroup>
                  <Form.Label htmlFor="mytextarea">Content:</Form.Label>
                  <Editor
                    apiKey='3x16okcb0efx95eglysiquhpncvfian5frqyuonhi10epcz7'
                    initialValue="<p>This is the initial content of the editor</p>"
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                      ],
                    }}
                    onEditorChange={handleEditorChange}
                  />
                </StyledFormGroup>
                <StyledFormGroup>
                  <Form.Label htmlFor="tag-input">Add Tags:</Form.Label>
                  <FormControl
                    type="text"
                    id="tag-input"
                    placeholder="Enter a tag and press Enter"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagKeyPress}
                  />
                </StyledFormGroup>
                <StyledKeyWords>
                  {tags.map((tag, index) => (
                    <KeywordTag key={index} onClick={() => handleTagClick(tag)}>
                      {tag}
                    </KeywordTag>
                  ))}
                </StyledKeyWords>
                <PrimaryButton type="submit" id="submit-button">
                  Submit
                </PrimaryButton>
              </Form>
              {notification.message && (
                <Notification success={notification.success}>
                  {notification.message}
                </Notification>
              )}
            </Card.Body>
          </StyledCard>
        </Col>
      </StyledRow>
    </StyledContainer>
  );
};

export default LegalDocumentEditor;
