import React, { createContext, useState } from "react";


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isFakeDark, setIsFakeDark] = useState(false);


    return (
        <AppContext.Provider value={{ isFakeDark, setIsFakeDark }}>
            {children}
        </AppContext.Provider>
    )

}
