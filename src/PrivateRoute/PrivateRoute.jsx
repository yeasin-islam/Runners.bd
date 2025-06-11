import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";
import LoadingFallback from "../components/shared/LoadingFallback";

const PrivateRoute = ({children}) => {
    const { user, isLoading } = use(AuthContext)
    const location = useLocation();

    if(isLoading) {
        return <LoadingFallback></LoadingFallback>
    }

    if(!user) {
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }
    
    return children
};

export default PrivateRoute;