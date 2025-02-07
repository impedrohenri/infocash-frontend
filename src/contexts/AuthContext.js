import { createContext } from "react";
import { useEffect, useState } from "react";



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

    const signIn = (data) => {
        fetch("http://localhost:3005/api/usuario/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            if (response.status === 401) {
                return false
            }
            return response.json();
        })
        .then((data) => {
            if (data.error) {
                alert(data.error);
            } else {
                setUser(data);
                localStorage.setItem("@Auth:user", JSON.stringify(data));
                localStorage.setItem("@Auth:token", data.token);
                return true
            }
        })
    };


    const signOut = (e) => {
        e.preventDefault()
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