import React, { useEffect } from "react";
import { useStateValue } from "./AppContext";
import { faker } from "@faker-js/faker";

function createRandomPost(){
    return {
        title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
        body: faker.hacker.phrase(),
    };

};

// Define the App component
function App() {  
    // Get the isFakeDark state and dispatch function from the context
    const [{ isFakeDark}, dispatch] = useStateValue(); 
    // This line uses the useStateValue hook to get the isFakeDark state and the dispatch function from the context.
    // The useStateValue hook returns an array with the current state and a dispatch function that can be used to update the state.

    const [posts, setPosts] = React.useState(() => 
       Array.from({length: 30}, () => createRandomPost())
       // This line initializes the posts state using the useState hook, setting it to an array of 30 randomly generated posts.
       
    );

    








}

