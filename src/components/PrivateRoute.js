import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({children, ...rest}) => {
    let { user } = useContext(AuthContext)

    return !user ? <Navigate to='/Login'/> : children;
}

export default PrivateRoute;

