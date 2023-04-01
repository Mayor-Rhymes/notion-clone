import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoteContextProvider from "./context/NoteContextProvider";

export default function App() {
  return (
    <NoteContextProvider>
      <div className="container">
        <Navbar />

        <Outlet />

        <ToastContainer />
      </div>
    </NoteContextProvider>
  );
}
