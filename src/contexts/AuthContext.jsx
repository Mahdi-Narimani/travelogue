import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    isAuthentication: false,
    user: null
}

const reducer = (state, action) =>
{
    switch (action.type)
    {
        case 'LOGIN':
            return {
                ...state,
                isAuthentication: true,
                user: action.payload
            }
            break;

        case 'LOGOUT':
            return {
                ...state,
                isAuthentication: false,
                user: null
            }
            break;

        default:
            break;
    }

}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthProvider = ({ children }) =>
{

    const [{ isAuthentication, user }, dispatch] = useReducer(reducer, initialState);

    const LogIn = (email, password) =>
    {
        if (email === FAKE_USER.email && password === FAKE_USER.password)
            dispatch({ type: 'LOGIN', payload: FAKE_USER })
    }
    const LogOut = () =>
    {
        dispatch({ type: 'LOGOUT' })
    }

    return (
        <AuthContext.Provider
            value={{
                    isAuthentication,
                    user,
                    LogIn,
                    LogOut
                }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () =>
{
    const context = useContext(AuthContext);
    if (context !== undefined)
        return context;
}


export { AuthProvider, useAuth };