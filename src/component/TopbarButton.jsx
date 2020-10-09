import React, { Component } from "react";
import COLORS from "../colors";

export default class TopbarButton extends Component {
    render() {
        return (
            <button style={sTopbarButton}>
                {this.props.name}
            </button>
        )
    }
}

// Styles

const sTopbarButton = {
    backgroundColor: "white",
    color: COLORS.charcoal,
    border: "none",
    padding: "8px",
    flex: "1",
    textAlign: "center",
    textDecoration: "underline",
    display: "ineline-block",
    fontSize: "16px",
}