// import neccessery module
import React, { createContext, useContext, useReducer } from "react";
import * as faker from '@faker-js/faker';

import { initialState, reducer, actionTypes } from "./AppReducer"

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

// Return the AppContext.Provider component with the state and dispatch values as context
  
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )

}

// create a custom hook named useStateValue to consume the Appcontext
export const useStateValue = () => useContext(AppContext);
