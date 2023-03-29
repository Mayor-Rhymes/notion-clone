import {create} from 'zustand';


export interface INote {

    _id: number;
    title: string;
    content: string;
}



export interface NoteState {

    notes: INote[];
    // total: () => void;
    addNote: (newNote: INote) => void;
    removeNote: (id: number) => void;

}


export const useNoteStore = create<NoteState>((set) => ({

    notes: [],

    // total: () => set((state) => ({total: state.notes.length})),
    
    addNote: (newNote: INote) => set((state: NoteState) => ({ notes: [...state.notes, newNote]})),

    removeNote: (id: number) => set((state: NoteState) => ({

        notes: [...state.notes.filter(note => note._id !== id)]

    })),


    

}))