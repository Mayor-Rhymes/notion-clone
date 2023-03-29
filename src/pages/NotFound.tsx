

import {Link, useNavigate} from 'react-router-dom';

const NotFound = () => {


   const navigate = useNavigate();


   const handleNavigationToPreviousPage = () => {

      navigate(-1);
   }


   return (

     <div className="not-found">
        
        <h1>This Page Is Either Broken or Does Not Exist</h1>

        <Link to="/">Go Back Home</Link>

        <button onClick={handleNavigationToPreviousPage} className="link-button">Go Back to Previous Page</button> 

        
     </div> 
   )

}

export default NotFound;