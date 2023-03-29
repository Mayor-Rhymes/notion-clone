import { createContext, useEffect, useReducer, ReactElement} from 'react';
import { useUserContext } from '../hooks/useUserContext';
import { Props } from './UserContextProvider';



const initialState: Iinit = {

    notes: null,
    total: 0,

}





interface Iinit {

    notes: INote[] | null;
    total: number;

}

interface INote {

    _id: string;
    title: string;
    content: string;
}





interface NoteAction {

    type: string;
    payload: Iinit;
    note?: INote;
    id?: string;
}


const NoteReducer = (state: Iinit, action: NoteAction ) => {


     switch(action.type) {


        case "GETNOTES":
            return {
                ...state, 
                notes: action.payload.notes, 
                total: action.payload.total
            };


        case "ADDNOTE":
            return {

                ...state, 
                notes: state.notes === null ? [action.note] : [...state.notes, action.note],
                total: state.notes.length
            };


        case "REMOVENOTE":
            
            return {

                ...state, 
                notes: [...state.notes.filter(note => note._id !== action.id)],
                total: state.notes.length
            };


        case "HANDLENOTEUPDATE":
            return {

                ...state, 
                notes: [...state.notes.filter(note => note._id !== action.id), action.note],
                total: state.notes.length
            };
            


        case "REMOVENOTES":
            return {

                ...state, 
                notes: null, 
                total: 0,
            };
            

        default:
            return state;
            
     }
}


export const NoteContext = createContext(null);




const NoteContextProvider = ({children}: Props) => {

     const [state, dispatch] = useReducer(NoteReducer, initialState)
     


     return (


        <NoteContext.Provider value={{ ...state, dispatch }}>
            {children}
        </NoteContext.Provider>
     )

}

export default NoteContextProvider;