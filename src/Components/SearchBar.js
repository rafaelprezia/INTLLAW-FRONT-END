import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

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

const PrimaryButton = styled.button`
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

const LinkButton = styled.button`
  background: none;
  border: ${(props) => (props.isFocused ? '1px solid #007bff' : 'none')};
  box-shadow: ${(props) => (props.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' : 'none')};
  color: #10222e;
  text-decoration: none;
  font-weight: 400;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
`;

const SearchBar = () => {
  const [advancedSearchVisible, setAdvancedSearchVisible] = useState(false);
  const [isLinkButtonFocused, setIsLinkButtonFocused] = useState(false);
  const [searchParams, setSearchParams] = useState({
    basic: '',
    title: '',
    date: '',
    parties: '',
    category: '',
    tags: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSearchParams({ ...searchParams, [id]: value });
  };

  const handleBasicSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchParams.basic}`);
  };

  const handleAdvancedSearchSubmit = (e) => {
    e.preventDefault();
    const { title, date, parties, category, tags } = searchParams;
    navigate(`/search?title=${title}&date=${date}&parties=${parties}&category=${category}&tags=${tags}`);
  };

  return (
    <StyledContainer>
      <StyledRow>
        <Col lg={9} md={12} col={12}>
          <StyledCard>
            <Form id="basic-search-form" onSubmit={handleBasicSearchSubmit}>
              <StyledFormGroup>
                <Form.Label htmlFor="basic">Search:</Form.Label>
                <FormControl
                  type="text"
                  id="basic"
                  className="form-control"
                  placeholder="Enter search query"
                  value={searchParams.basic}
                  onChange={handleInputChange}
                />
              </StyledFormGroup>
              <PrimaryButton type="submit" className="btn btn-primary2 btn-block">
                Search
              </PrimaryButton>
            </Form>
            <LinkButton
              id="toggle-advanced-search"
              className="btn btn-link2 btn-block mt-3"
              onClick={() => setAdvancedSearchVisible(!advancedSearchVisible)}
              onFocus={() => setIsLinkButtonFocused(true)}
              onBlur={() => setIsLinkButtonFocused(false)}
              isFocused={isLinkButtonFocused}
            >
              Advanced Search
            </LinkButton>
            {advancedSearchVisible && (
              <div id="advanced-search" className="mt-3">
                <Form id="search-form" onSubmit={handleAdvancedSearchSubmit}>
                  <StyledFormGroup>
                    <Form.Label htmlFor="title">Title:</Form.Label>
                    <FormControl
                      type="text"
                      id="title"
                      className="form-control"
                      placeholder="Enter document title"
                      value={searchParams.title}
                      onChange={handleInputChange}
                    />
                  </StyledFormGroup>
                  <StyledFormGroup>
                    <Form.Label htmlFor="date">Date:</Form.Label>
                    <FormControl
                      type="date"
                      id="date"
                      className="form-control"
                      value={searchParams.date}
                      onChange={handleInputChange}
                    />
                  </StyledFormGroup>
                  <StyledFormGroup>
                    <Form.Label htmlFor="parties">Parties Involved:</Form.Label>
                    <FormControl
                      type="text"
                      id="parties"
                      className="form-control"
                      placeholder="Enter parties involved"
                      value={searchParams.parties}
                      onChange={handleInputChange}
                    />
                  </StyledFormGroup>
                  <StyledFormGroup>
                    <Form.Label htmlFor="category">Category:</Form.Label>
                    <Form.Control
                      as="select"
                      id="category"
                      value={searchParams.category}
                      onChange={handleInputChange}
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
                    <Form.Label htmlFor="tags">Tags (comma separated):</Form.Label>
                    <FormControl
                      type="text"
                      id="tags"
                      className="form-control"
                      placeholder="Enter tags"
                      value={searchParams.tags}
                      onChange={handleInputChange}
                    />
                  </StyledFormGroup>
                  <PrimaryButton type="submit" className="btn btn-primary2 btn-block">
                    Search
                  </PrimaryButton>
                </Form>
              </div>
            )}
          </StyledCard>
          <div id="search-results" className="my-5"></div>
        </Col>
      </StyledRow>
    </StyledContainer>
  );
};

export default SearchBar;
