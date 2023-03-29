import { create } from 'zustand';
import Axios from 'axios';


const URL = 'http://localhost:4000/api/v1/user';

const user = localStorage.getItem('user') || null;



interface IUser {

    message: string,
    email: string,
    username: string,
    token: string,
    
}


interface Entry {

    email: string;
    username?: string;
    password: string;
}



interface UserState {

    user: IUser | null;
    registerUser: (entry: Entry) => void;
    loginUser: (entry: Entry) => void;
    logoutUser: () => void;

}



export const useUserStore = create<UserState>((set) => ({

    user: JSON.parse(user),

    registerUser: async (entry: Entry) => {
        
            
            const response = await Axios.post(
                `${URL}/register`, 
                entry,
            );

            const userData = response.data;

            


            set({user: userData})

            localStorage.setItem('user', JSON.stringify(user))
        
    },

    loginUser: async (entry: Entry) => {
        
            
            const response = await Axios.post(
                `${URL}/login`, 
                entry,
            );

            const userData = response.data;

            


            set({user: userData})
            localStorage.setItem('user', JSON.stringify(user))
        
    },


    logoutUser: () => {
         
        set({user: null})
        localStorage.removeItem('user');

    }



}))