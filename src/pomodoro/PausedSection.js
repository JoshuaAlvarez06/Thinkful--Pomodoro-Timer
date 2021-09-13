import React from "react";

//Used in HiddenSections.js
export default function PausedSection({ isTimerRunning }) {
    if (!isTimerRunning) {
        return (
        <>
            <h3>PAUSED</h3>
        </>
    ) 
    } else {
        return null;
    }
    
}