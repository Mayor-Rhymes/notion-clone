import Register from "./components/Register"
import Login from "./components/Login";
import Navbar from "./components/Navbar"
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/ProtectedRoute";
import UserContextProvider from "./context/UserContextProvider";
import NoteContextProvider from "./context/NoteContextProvider";



export default function App() {

    return (
     

        

           <Router>
              <UserContextProvider>
                <NoteContextProvider>
                  <div className="container">

                     <Navbar />
              

                     <Routes>

                       <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
                       <Route path="/register" element={<Register />}/>
                       <Route path="/login" element={<Login />}/>

                       <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>}/>


                     </Routes>


                     <ToastContainer />
              
                   </div>
                </NoteContextProvider>
              </UserContextProvider>

            </Router>
        
    )

}

