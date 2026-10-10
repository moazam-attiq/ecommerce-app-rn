import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);


    const setUserData = (user) => {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setPassword(user.password);
        setCurrentUser(user);
    }

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, setUserData, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}