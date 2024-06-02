import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../../context/search';
import { AiOutlineSearch, AiOutlineAudio } from 'react-icons/ai'; // Import icons from react-icons
import './SearchInput.css'; // Import CSS file for styling

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const [suggestions, setSuggestions] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [typedLetters, setTypedLetters] = useState(''); // Track typed letters
  const [autocompleteText, setAutocompleteText] = useState(''); // Track autocomplete text
  const navigate = useNavigate();
  
  useEffect(() => {
    if (typedLetters.length > 0) {
      const suggestion = suggestions.find(s => s.toLowerCase().startsWith(typedLetters.toLowerCase()));
      if (suggestion) {
        setAutocompleteText(suggestion);
      } else {
        setAutocompleteText('');
      }
    } else {
      setAutocompleteText('');
    }
  }, [typedLetters, suggestions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/search/${values.keyword}`);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = async (e) => {
    const keyword = e.target.value;
    setValues({ ...values, keyword });
    setTypedLetters(keyword); // Update typed letters
    if (keyword.length > 0) {
      try {
        const { data } = await axios.get(`http://localhost:5000/autocomplete?query=${keyword}`);
        setSuggestions(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setValues({ ...values, keyword: suggestion });
    setSuggestions([]); // Clear suggestions after selection
    setTypedLetters(suggestion); // Update typed letters
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Tab' && autocompleteText) {
      e.preventDefault();
      setValues({ ...values, keyword: autocompleteText });
      setSuggestions([]); // Clear suggestions after selection
      setTypedLetters(autocompleteText); // Update typed letters
    }
  };

  const handleVoiceSearch = async () => {
    try {
      const recognition = new window.webkitSpeechRecognition(); // Initialize speech recognition
      recognition.lang = 'en-US'; // Set language to English
      recognition.continuous = true; // Enable continuous recognition
      recognition.interimResults = true; // Get interim results
      recognition.start(); // Start recognition

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setTypedLetters(transcript); // Update typed letters with transcript
      };
    } catch (error) {
      console.error("Error accessing user's audio:", error);
    }
  };

  return (
    <div className="search-container">
      <form className="search-form" role="search" onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="autocomplete-container">
            <input
              className={`search-input ${expanded ? 'expanded' : ''}`}
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={typedLetters} // Use typed letters instead of values.keyword
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              onFocus={() => setExpanded(true)} // Expand input box on focus
            />
            <div className="autocomplete-text">
              {autocompleteText}
            </div>
          </div>
          <button className="search-button" type="submit"><AiOutlineSearch /></button>
          <button className="voice-search-button" type="button" onClick={handleVoiceSearch}><AiOutlineAudio /></button>
        </div>
        {expanded && (
          <div className="suggestions-box">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchInput;
