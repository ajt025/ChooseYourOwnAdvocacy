import { Modal, TextField } from "@material-ui/core";
import React from "react";
import {Tag} from 'en-pos';
import styled from 'styled-components'
import Suggestible from "./Suggestible";

export default function EditorModal(props) {
    let manualRef; // reference to the modal's TextField for manual input

    // #region HANDLERS

    // Updates overall state when a word has been synonymized
    const handleTextChange = (index, changedWord) => {
        // Change out single word from sentence
        let newWords = words.slice();
        newWords[index] = changedWord;

        // Reformat the sentence with spaces
        var resultSentence = "";
        for (var i = 0; i < newWords.length - 1; ++i) {
            resultSentence += newWords[i];
            resultSentence += ' ';
        }
        resultSentence += newWords[newWords.length - 1]; // avoid extra space at end

        // Update Arranger state
        props.wordUpdateHandler(resultSentence);
        // Update manual texteditor
        manualRef.value = resultSentence;
    }
    // #endregion

    // Split words only when modal is open
    const words = props.isModalOpen ?
        props.currSentence.split(" ") : [];

    // Tag each word in sentence with its POS, also map words to Suggestible objects
    const listWords = setupWords();
    function setupWords() {
        // assuming words is populated...
        // Run NLP tagger on words
        const wordsTags = new Tag(words).initial().smooth().tags.map((string) => {
            // TODO improved by a LUT since there are few POS used

            // Simplify tags -- ignore tenses
            if (string === "NN" || string === "NNS") {
                return "noun";
            } else if (string.startsWith("VB")) {
                return "verb";
            } else if (string.startsWith("JJ")) {
                return "adjective";
            } else if (string.startsWith("RB")) {
                return "adverb";
            }
            return "NA" // not supported
        });

        // Map word array into partitions + zip POS
        const listWords = words.map((text, index) => (
            <Word
                text={text}
                key={index}
                index={index}
                pos={wordsTags[index]}
                changedWordHandler={handleTextChange}/>
        ));

        return listWords;
    }

    const body = (
        <ModalContainer>
            <WordContainer>
                {listWords}
            </WordContainer>
            <Info>
                Alternatively, write your own sentence below.
            </Info>
            <CustomSentence
                inputRef={node => {
                    manualRef = node;
                }}
                defaultValue={props.currSentence}
                onKeyPress={event => {
                    event.persist();
                    if (event.key === 'Enter') {
                        console.log("enter");
                        props.wordUpdateHandler(event.target.value);
                    }
                }}
            />
        </ModalContainer>
    );

    return (
        <div>
            <ModalCentered
                id={props.id}
                open={props.isModalOpen}
                onClose={props.onClose}
            >
                {body}
            </ModalCentered>
        </div>
    );
}

//#region STYLING
const CustomSentence = styled(TextField)`
    width: 90%;
    flex: 1;
`

const Info = styled.div`
    margin-top: 50px;
    margin-bottom: 50px;
    flex: 1;
    font-style: italic;
`

const Word = styled(Suggestible)`
    display: inline-block;
    width: 10px;
    padding: 5px;
    margin-left: 1%;
    margin-right: 1%;
    border: solid 2px darkslategray;
`

const WordContainer = styled.div`
    margin-top: 3%;
    flex: 1;
`

const ModalCentered = styled(Modal)`
    display: flex;
    justify-content: center;
    align-items: center;
`

const ModalContainer = styled.div`
    height: 30%;
    width: 80%;
    background-color: white;
    text-align: center;
`
//#endregion