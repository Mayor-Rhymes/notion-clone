import { useNavigate, Navigate } from "react-router-dom"
import { useUserContext } from "../hooks/useUserContext";
import React from "react"



interface Props {


    children?: React.ReactElement;
}

const ProtectedRoute = ({children}: Props) => {

    const {user} = useUserContext();
    const navigate = useNavigate();



    if (!user) {

       return <Navigate to="/login" />
    } else {

        return children;
    }

}

export default ProtectedRoute