



import { useContext } from 'react';
import { NoteContext } from '../context/NoteContextProvider';

export const useNotesContext = () => {


    const context = useContext(NoteContext);

    if (!context) {
        return "This component does not exist within the context"
    } else {
        return context;
    }
}