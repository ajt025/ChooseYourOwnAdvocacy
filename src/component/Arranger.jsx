import React, { Component } from "react";
import Parser from "../model/Parser";

import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import styled from 'styled-components';

import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from "@material-ui/core";
import EditorModal from "./EditorModal";

// Draggable sentence
const SortableItem = SortableElement(({value, sortIndex, onOpen}) => {
    return (
        <StyledListItem>
            <div>
                {value}
            </div>
            <IconButton
                size="small"
                onClick={() => onOpen(sortIndex)}
            >
                <EditIcon/>
            </IconButton>
        </StyledListItem>
    );
});

// Container for draggable sentences
const SortableList = SortableContainer(({items, onOpen}) => {
    const listItems = items.map((value, index) => (
        <SortableItem
            key={`item-${value}`}
            index={index}
            value={value}
            sortIndex={index}
            onOpen={onOpen}
        />
    ));

    return (
        <StyledList>
            {listItems}
        </StyledList>
    );
});

// Create and render container of draggable sentences
export default class Arranger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentences: [],
            isModalOpen: false,
            currIndex: 0, // index of sentence in Modal
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSentenceUpdate = this.handleSentenceUpdate.bind(this);
    }
    
    // Load in the template
    componentDidMount() {
        const parser = new Parser();
        this.setState({
            sentences: parser.sentences
        });
    }

    //#region HANDLERS
    handleOpen(index) {
        this.setState({
            isModalOpen: true,
            currIndex: index,
        });
    };
    
    handleClose() {
        this.setState({
            isModalOpen: false
        });
    };

    // Take updated sentence from editor modal and update Arranger's state
    handleSentenceUpdate(sentence) {
        let cpSentences = this.state.sentences.slice();
        cpSentences[this.state.currIndex] = sentence;

        this.setState({
            sentences: cpSentences
        });
    }

    // Handles back array sorting when dragging sentences
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({sentences}) => ({
            sentences: arrayMove(sentences, oldIndex, newIndex),
        }));
    };
    //#endregion

    render() {
        return (
            <Container>
                <SortableList items={this.state.sentences} 
                                onSortEnd={this.onSortEnd}
                                onOpen={this.handleOpen}
                                pressDelay={150}
                                helperClass="active"
                />
                <EditorModal
                    id="modal"
                    isModalOpen={this.state.isModalOpen}
                    onClose={this.handleClose}
                    currSentence={this.state.sentences[this.state.currIndex]}
                    wordUpdateHandler={this.handleSentenceUpdate}
                />
            </Container>
        )
    }
}

// #region STYLING

const Container = styled.div`
    display: inline-block;
    width: 100%;
    background-color: #2E4057;
`
const StyledList = styled.ul`
    list-style-type: none;
    padding: 0px;
    margin: 0px;
    width: 70%;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15%;
    padding-right: 15%;
`

const StyledListItem = styled.div`
    display: flex;
    flex: 5;
    margin-top: 3px;
    margin-bottom: 3px;
    background-color: white;
    width: 100%;
    padding: 5px;
    color: black;
    border-style: solid;
    border-width: 2px;
    border-color: #048BA8;

    div {
        flex: 1;
        padding: 8px;
    }

    &.active {
        text-align: center;
        opacity: 70%;
        border-width: 3px;
    }
`
// #endregion