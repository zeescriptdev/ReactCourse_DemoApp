import React, { useState } from "react";

const ConditionalRendering = () => {
    const hour = 15

    function getGreeting() {
        if(hour < 12) {
            return "Good Morning";
        } else if(hour < 18) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    }

    return (
        <div>
            <h1>Current Hour: {hour}</h1>
            <h1>Greeting: {getGreeting()}</h1>
        </div>
    )
};

export default ConditionalRendering;
