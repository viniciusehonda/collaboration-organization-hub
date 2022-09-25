import React from "react";
import { useSelector } from "react-redux";
import { Navigate, RouteProps } from "react-router-dom";
import { RootState } from "../store/store";

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
    const isLoggedIn = useSelector((state: RootState) => {
        return state.isLoggedIn;
    });

    return (isLoggedIn ? <>{props.children}</> : <Navigate to="/login"></Navigate>);
}

export default PrivateRoute