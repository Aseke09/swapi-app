import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const ProtectedRoute = ({children}: { children: JSX.Element}) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    return isAuthenticated ? children : <Navigate to="/login"/>
}