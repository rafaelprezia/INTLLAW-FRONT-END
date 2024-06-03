import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
`;

const Card = styled.div`
  width: 80%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormControl = styled.input`
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SelectControl = styled.select`
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const TextAreaControl = styled.textarea`
  width: 100%;
  height: 200px;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const TagInput = styled.input`
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function Cookies(){
    return (
    <Container>
        <Card>
            <form>
                <FormControl
                    type="text"
                    id="document-title"
                    placeholder="Enter Document Title"
                />
                <div className="form-group">
                    <label htmlFor="document-date">Date:</label>
                    <FormControl type="date" id="document-date" />
                </div>
                <div className="form-group">
                    <label htmlFor="document-parties">Parties Involved:</label>
                    <FormControl
                    type="text"
                    id="document-parties"
                    placeholder="Enter Parties Involved"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <SelectControl id="category">
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
                    </SelectControl>
                </div>
                <div className="form-group">
                    <label htmlFor="mytextarea">Content:</label>
                    <TextAreaControl id="mytextarea"></TextAreaControl>
                </div>
                <div className="form-group">
                    <label htmlFor="tag-input">Add Tags:</label>
                    <TagInput
                    type="text"
                    id="tag-input"
                    placeholder="Enter a tag and press Enter"
                    />
                </div>
                <div className="form-group">
                    <SubmitButton type="submit">Submit</SubmitButton>
                </div>
            </form>
        </Card>
    </Container>
        
    );
}

export default Cookies;

