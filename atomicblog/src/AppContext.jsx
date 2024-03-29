import React, { createContext, useContext, useReducer } from "react";
import { faker } from '@faker-js/faker';
import { initialState, reducer, actionTypes } from "./AppReducer"

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const 


    return (
        <AppContext.Provider value={{ isFakeDark, setIsFakeDark }}>
            {children}
        </AppContext.Provider>
    )

}


