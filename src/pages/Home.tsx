
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNotesContext } from "../hooks/useNotesContext";
import { useUserContext } from "../hooks/useUserContext";
import Axios from 'axios';
import NoteSelect from "../components/NoteSelect";
import { AiFillPlusCircle } from 'react-icons/ai'




export interface INote{


    _id: string;
    title: string;
    content: string;
}



//function test



const Home = () => {
   
   

    const [visible, setVisible] = useState(false)

    const handleVisibility = () => {

        setVisible((prev) => !prev)
    }


    const {notes, dispatch} = useNotesContext();
    const {user} = useUserContext();
    

    // const [noteArr, setNoteArr] = useState([]);

    


    const  modules  = {
        toolbar: [
            [{ font: [1] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: ["white", "blue", "black", "grey", "orange", "coral", "green", "brown", "purple", "lightblue"] }, { background: ["white", "blue", "black", "grey", "orange", "coral", "green", "brown", "purple", "lightblue"] }],
            [{ script:  "sub" }, { script:  "super" }],
            ["blockquote", "code-block"],
            [{ list:  "ordered" }, { list:  "bullet" }],
            [{ indent:  "-1" }, { indent:  "+1" }],
            [{ align: ["right", "center", "justify"] }],
            ["link", "image", "video"],
            ["clean"],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            
        ],
    };

    //const [note, addNote] = useState<INote[]>([])


    
    const [value, setValue] = useState('');

    const [title, setTitle] = useState('');
    
    //hacky method
    const [id, setId] = useState('');

    

    const fetchNotes = async () => {

        const response = await Axios.get('http://localhost:4000/api/v1/notes/', {
            
           headers: {

             'Authorization': `Bearer ${user.token}`
          }
        });

        const result = response.data;

        console.log(result);

        dispatch({type: 'GETNOTES', payload: result});

        
        



        
     }
    


    const handleAdd = async () => {

        if (title && value) {
            try{
                
                const response = await Axios.post('http://localhost:4000/api/v1/notes/', {
                  title,
                   content: value,
                 }, {
                
                    headers: {
     
                      'Authorization': `Bearer ${user.token}`
                   }
                 })
                

                 const result = response.data;
                 console.log(result)
           
                 dispatch({type: 'ADDNOTE', note: {_id: result.note._id, title: title, value: value}})

                 setTitle('');
                 setValue('');

            } catch (err) {

                console.log(err);
            }
           
        }
    }


    const handleDelete = async (id: string) => {
        
        try {


            const response = await Axios.delete(`http://localhost:4000/api/v1/notes/${id}`, {
                headers: { 
                    'Authorization': `Bearer ${user.token}`
                }
            })
            
            const result = response.data;
            dispatch({type: 'REMOVENOTE', id: id})

            toast.success("Note has been successfully removed", {
               className: "success-message"
            })


        } catch (err) {

           toast.error("Delete was unsuccessful", {

            className: 'error-message'
           })
        }
        

    }


    const handleView = async (id: string) => {

       
       try {

         const response = await Axios.get(`http://localhost:4000/api/v1/notes/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
         })


         const note = response.data;
         setTitle(note.title);
         setValue(note.content);
         setId(note._id)

         

         
       } catch(err){
           console.log(err);
       }

    }


    const handleEdit = async (id: string) => {
    
        try{
          
            const response = await Axios.patch(`http://localhost:4000/api/v1/notes/${id}`, {

               title,
               content: value,
            }, 
            
            
            {
                headers: {
    
    
                    'Authorization': `Bearer ${user.token}`
                }
            })


            const result = response.data;
            dispatch({type: 'HANDLENOTEUPDATE', id:id, note: result})

            toast.success("Note has been successfully updated", {

                className: "success-message"
            })

            
    
        } catch (err) {
          
           toast.error("Something went wrong", {

             className: "error-message"
           })
            
    
    
        }
    
    
    }


    const handleNew = () => {


        setId("");
        setTitle("");
        setValue("");
    }


   



     



    
    

    console.log(notes)


   useEffect(() => {

      if(user){

         
         
         fetchNotes();
         
      }
      
      
   }, [user, dispatch])


   
   console.log(notes)

   return (

      <div 
      className="home"
      
      >

        {/* notelist sidebar */}
        <div className="sidebar">
           
           {notes?.map((note: any) => 
            
                <NoteSelect key={note._id} note={note} handleDelete={handleDelete} handleView={handleView}/>
            
            )}

            {/* <button onClick={handleNew}>Add New</button> */}
            <AiFillPlusCircle onClick={handleNew} style={{ fontSize: '30px' }}/>

            

        </div>

        {/* notecreator */}
        <div className="note-creator">


           <input 
           type="text" 
           id="title" 
           name="title" 
           placeholder="Enter title" 
           className="title" 
           value={title} 
           onChange={(event) => setTitle(event.target.value)}
           />



           <ReactQuill 
           modules={modules}
           style={{ border: "none", fontSize: "30px" }} 
           theme="snow" 
           value={value} 
           onChange={setValue} 
           placeholder="Add your content here..."
           className="editor"
        
           />


          {/* How do I handle edit? */}
          {!id && (title && value) && <button onClick={handleAdd} className="add-button">Add</button>}

          {(id && title && value) && <button onClick={() => handleEdit(id)} className="add-button">Update</button>}

           


        </div>



      </div>
   )


}

export default Home;