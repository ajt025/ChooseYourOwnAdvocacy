import React, { Component } from "react";
import TopbarButton from "./TopbarButton";

export default class Topbar extends Component {
    render() {
        return (
            <div style={sTopbarComponent}>
                <TopbarButton name="Create a Template"/>
                <TopbarButton name="About Us"/>
            </div>
        )
    }
}

// Styles

const sTopbarComponent = {
    width: "100%",
    minHeight: "5vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
}