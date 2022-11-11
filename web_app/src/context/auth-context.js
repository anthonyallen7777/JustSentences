import React, {useState} from 'react';

export const AuthContext = React.createContext({
    isAuth: false,
    signIn: () => {}
});

const AuthContextProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loginHandler = () => {
        setIsAuthenticated(true);
    }
    return (
        <AuthContext.Provider
        value={{signIn: loginHandler, isAuth: isAuthenticated}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;