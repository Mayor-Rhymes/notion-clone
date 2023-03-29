import { Link } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { useNotesContext } from "../hooks/useNotesContext";


const Navbar = () => {


   const {user, dispatch} = useUserContext();
   const {dispatch: noteDispatch} = useNotesContext();
   


   const handleLogout = () => {

      dispatch({type: "LOGOUT"});
      noteDispatch({type: "REMOVENOTES"});
      localStorage.removeItem("user");
   }

   return (

     <nav>

        <h3>NoteTaker</h3>

        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="#">About</Link></li>
            {/* <li><Link to="#">Add</Link></li> */}
            {user && <li><span onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span></li> }
            
        </ul>
     </nav>
   )

}


export default Navbar;

