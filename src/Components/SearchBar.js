import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import getKeyWords from '../Services/KeyWordsServices.js';
import { MdSearch } from "react-icons/md";

const SearchBarContainer = styled.section`
    display: flex;
    flex-direction: column;
    width: 85%;
    margin-bottom: 2%;
    margin-top: 2%;
`;

const SearchBarWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 100%;
`;

const StyledSearchBar = styled.input`
    width: 100%; 
    height: 45px; 
    font-family: 'Inter';
    font-size: 32px;
    line-height: 50px; 
    border-radius: 3px;
    color: #565656; 
    border: none; 
    background-color: #e6e6e6; 
    outline: none; 
    padding-left: 50px; 

    &::placeholder {
        text-align: center;
        color: #565656;
    }

    &:focus {
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5); 
    }
`;

const SearchIcon = styled(MdSearch)`
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: #000000;
    font-size: 32px; 
`;

const KeyWords = styled.section`
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #000000; 
    background-color: ${({ selected }) => (selected ? '#808080' : '#e6e6e6')}; 
    margin-top: 5px; 
    cursor: pointer; 

    &:hover {
        background-color: #808080; 
    }
`;

const Text = styled.p`
    font-family: 'Inter';
    font-size: 20px; 
    color: #565656; 
    padding: 5px;
`;

function SearchBar({ placeholder }) {
    const [inputValue, setInputValue] = useState('');
    const [autocompleteOptions, setAutocompleteOptions] = useState([]);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        fetchAutocompleteOptions(value);
    };

    const fetchAutocompleteOptions = async (value) => {
        const wordParts = value.split(' ');
        const lastPart = wordParts[wordParts.length - 1];
        setAutocompleteOptions(await getKeyWords(lastPart));
    };

    const handleKeyDown = (event) => {
        switch (event.key) {
            case 'Enter':
                if (selectedOptionIndex !== -1) {
                    handleWordClick(autocompleteOptions[selectedOptionIndex].keyWord);
                    setSelectedOptionIndex(-1);
                } else {
                    navigate(`/search/${inputValue}`);
                }
                break;
            case 'ArrowUp':
                setSelectedOptionIndex((prevIndex) =>
                    prevIndex === - 1 ? autocompleteOptions.length - 1 : prevIndex - 1
                );
                break;
            case 'ArrowDown':
                setSelectedOptionIndex((prevIndex) =>
                    prevIndex >= autocompleteOptions.length - 1 ? -1 : prevIndex + 1
                );
                break;
            default:
                break;
        }
    };

    const handleWordClick = (word) => {
        setInputValue((prevValue) => {
            const parts = prevValue.split(' ');
            parts.pop();
            setAutocompleteOptions([]);
            return parts.join(' ') + ' ' + word;
        });
    };

    return (
        <SearchBarContainer>
            <SearchBarWrapper>
                <SearchIcon />
                <StyledSearchBar
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                />
            </SearchBarWrapper>
            {autocompleteOptions.map((keyWord, index) => (
                <KeyWords
                    key={index}
                    onClick={() => handleWordClick(keyWord.keyWord)}
                    style={{
                        backgroundColor: selectedOptionIndex === index ? '#808080' : '#e6e6e6',
                    }}
                >
                    <Text>{keyWord.keyWord}</Text>
                </KeyWords>
            ))}
        </SearchBarContainer>
    );
}

export default SearchBar;
