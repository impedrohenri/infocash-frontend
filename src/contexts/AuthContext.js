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

    const signIn = async (data) => {
        await fetch("http://localhost:3005/api/usuario/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro na autenticação: " + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    setUser(data);
                    localStorage.setItem("@Auth:user", JSON.stringify(data.token));
                    localStorage.setItem("@Auth:token", data.token);
                    console.log(data.token)
                    console.log("Login bem-sucedido!");
                }
            })
            .catch((error) => {
                console.error("Erro ao realizar login:", error);
            });
    };


    const singOut = (e) => {
        e.preventDefault()
        console.log('deslogando')
        sessionStorage.clear()
        setUser(null);
        console.log(user)
        window.location.href="http://localhost:3000/"
    };

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, singOut, }}>
            {children}
        </AuthContext.Provider>
    );
};