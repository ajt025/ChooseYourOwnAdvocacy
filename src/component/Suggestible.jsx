import React, { useState } from 'react';
import {Menu, MenuItem} from '@material-ui/core';
import styled from 'styled-components';

const baseURL = "http://localhost:9000/thesaurus/?word=";
const posParam = "&pos=";

export default function Suggestible(props) {
    const [isShown, setIsShown] = useState(false); // synonym menu
    const [anchorEl, setAnchorEl] = useState(null); // element of word to syn.
    const [suggestions, setSuggestions] = useState([]); // queried suggestions for word
    
    // async call states
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // #region HANDLERS
    const handleMenuOpen = (event) => {
        event.persist();
        setAnchorEl(event.target);

        if (!isLoading && suggestions.length === 0) {
            populateSuggestions();
        }

        setIsShown(true);
    }

    const handleRequestMenuClose = () => {
        setIsShown(false);
    }

    const handleMenuSelect = (event) => {
        event.persist();

        // Update word in Modal and clear previous suggestions
        props.changedWordHandler(props.index, event.target.textContent);
        setSuggestions([]);

        handleRequestMenuClose();
    }
    // #endregion HANDLERS

    const populateSuggestions = () => {
        setIsLoading(true);
        fetch(baseURL + props.text + posParam + props.pos)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setIsLoading(false);
                    setSuggestions(result);                    
                },

                (error) => {
                    setIsLoading(false);
                    setError(error);
                }
            )
    }

    // List of MenuItems representing a word's synonyms
    const suggestedItems = (error) ?
        <div>ERROR</div>
        :
        suggestions.map((word, key) => (
            <MenuItem
                onClick={handleMenuSelect}
                key={key}
            >
                {word}
            </MenuItem>
        )
    );

    return (
        <span>
            <SingleWord
                onMouseEnter={props.pos !== "NA" ? handleMenuOpen : undefined}
                pos={props.pos}
            >
                {props.text}
            </SingleWord>
            <StyledMenu
                open={isShown}
                anchorEl={anchorEl}
                onClose={handleRequestMenuClose}
                MenuListProps={{ onMouseLeave: handleRequestMenuClose }}
            >
                {suggestedItems}
            </StyledMenu>
        </span>
        
    );
}

//#region  STYLING
const StyledMenu = styled(Menu)`
    margin-left: 10px;
`

const SingleWord = styled.span`
    margin-left: ${props => props.pos === "NA" ? "3px" : "20px"};
    margin-right: ${props => props.pos === "NA" ? "3px" : "20px"};
    padding: 3px;
    font-size: 20px;
    font-weight: ${props => props.pos === "NA" ? "normal" : "700"};
    color: ${props => props.pos === "NA" ? "black" : "green"};
`
//#endregion