import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user , setUser] = useState(null);
    const [id , setId] = useState(null);
    useEffect(()=> {
        axios.get("/profile").then(response => {
            setUser(response.data.username)
            setId(response.data.userId)
        })
    }, [])

    return (
        <UserContext.Provider
        value={{
            user,
            setUser,
            id,
            setId
        }}
        >
            {children}
        </UserContext.Provider>
    )
}