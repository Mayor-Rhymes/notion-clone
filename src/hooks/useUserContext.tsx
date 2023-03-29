

import { useContext } from 'react';
import { UserContext } from '../context/UserContextProvider';

export const useUserContext = () => {


    const context = useContext(UserContext);

    if (!context) {
        return "This component does not exist within the context"
    } else {
        return context;
    }
}