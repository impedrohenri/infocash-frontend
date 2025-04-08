import { createContext } from "react";
import { useEffect, useState } from "react";
import API from "../routes/api";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadingStoreData = () => {
            const storageUser = localStorage.getItem("@Auth:user");
            const storageToken = localStorage.getItem("@Auth:token");

            if (storageUser && storageToken) {
                setUser(JSON.parse(storageUser));
            }
        };
        loadingStoreData();
    }, []);

    const signIn = async (data) => {
        const response = await fetch(API + "/usuario/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.status === 401) {
            return false;
        }

        const responseData = await response.json();

        if (responseData.error) {
            alert(responseData.error);
            return false;
        } else {
            setUser(responseData);
            localStorage.setItem("@Auth:user", JSON.stringify(responseData));
            localStorage.setItem("@Auth:token", responseData.token);
            return true;
        }
    };


    const signOut = (e) => {
        localStorage.clear()
        setUser(null);
        window.location.href="http://localhost:3000/"
    };

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, }}>
            {children}
        </AuthContext.Provider>
    );
};