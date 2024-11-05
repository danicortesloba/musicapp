import PropTypes from 'prop-types'

import { createContext, useState } from "react";

const LoginContext = createContext();

const LoginContextComponent = ({children}) => {
    const currentUser = localStorage.getItem('user')

    const [user, setUser] = useState( currentUser !== 'undefined' ? JSON.parse(currentUser) : null)

    const contextData={
        user,
        setUser,
    }


    return (
        <LoginContext.Provider value={contextData}>
            {children}
        </LoginContext.Provider>
    )
}

LoginContextComponent.propTypes = {
    children: PropTypes.node
}

export {
    LoginContextComponent,
    LoginContext   
};
