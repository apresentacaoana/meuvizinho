'use client';

import { createContext, useContext, useState } from "react";
import usePersistState from "../hook/usePersistState";

const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
    const [authUser, setAuth] = usePersistState('authUser', {
        isAuth: null,
        user: null
    });

    return (
        <UserContext.Provider value={{ authUser, setAuth }}>
            {children}
        </UserContext.Provider>
    )
};

export const useUserContext = () => useContext(UserContext);