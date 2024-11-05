import PropTypes from 'prop-types';
import { useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({children}) => {

    const context = useContext(LoginContext)
    
    return (
        <>  { context.user ? children : <Navigate to="/users/login" replace /> } </>
    )
}

PrivateRoutes.propTypes = {
    children: PropTypes.node
}

export default PrivateRoutes
