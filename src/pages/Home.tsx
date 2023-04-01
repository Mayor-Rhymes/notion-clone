import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNotesContext } from "../hooks/useNotesContext";
import { useUserContext } from "../hooks/useUserContext";
import Axios from "axios";
import NoteSelect from "../components/NoteSelect";
import { AiFillPlusCircle } from "react-icons/ai";
import { modules } from "../config/reactQuillConfig";

export interface INote {
  _id: string;
  title: string;
  content: string;
}

//function test

const Home = () => {
  const { notes, dispatch } = useNotesContext();

  const user = JSON.parse(localStorage.getItem("user"));

  
  const [id, setId] = useState("");

  const [selectedNote, setSelectedNote] = useState<INote>({title: "", content:""} as INote);

  const [isEditing, setIsEditing] = useState(false);

  const fetchNotes = async () => {
    const response = await Axios.get("http://localhost:4000/api/v1/notes/", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const result = response.data;

    console.log(result);

    dispatch({ type: "GETNOTES", payload: result });
  };

  const saveNewNote = async () => {
    
      try {
        if (selectedNote.title && selectedNote.content) {
        const response = await Axios.post(
          "http://localhost:4000/api/v1/notes/",
          selectedNote,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const result = response.data;
        console.log(result);
        setSelectedNote(() => ({title: "", content: ""} as INote));
        dispatch({
          type: "ADDNOTE",
          note: { _id: result.note._id, title: result.note.title, content: result.note.content },
        });

        // addNewNote();
       }
      } catch (err) {
        console.log(err);
      }
    
  };

  const deleteNote = async (id: string) => {
    try {
      const response = await Axios.delete(
        `http://localhost:4000/api/v1/notes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const result = response.data;
      dispatch({ type: "REMOVENOTE", id: id });

      toast.success("Note has been successfully removed", {
        className: "success-message",
      });
    } catch (err) {
      toast.error("Delete was unsuccessful", {
        className: "error-message",
      });
    }
  };

  const viewNote = async (note: INote) => {
    
    setIsEditing(true);
    setSelectedNote(note);
    setId(note._id);
    console.log(id);
  };

  const editNote = async (id: string) => {
    
    try {
      const response = await Axios.patch(
        `http://localhost:4000/api/v1/notes/${id}`,

        selectedNote,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const result = response.data;
      dispatch({ type: "HANDLENOTEUPDATE", id: id, note: result });

      toast.success("Note has been successfully updated", {
        className: "success-message",
      });

    //   setIsEditing(false);
    } catch (err) {
      toast.error("Something went wrong", {
        className: "error-message",
      });
    }
  };

  const addNewNote = () => {
    
    

    setIsEditing(false);
    setSelectedNote(() => ({title: "", content: ""} as INote));
    setId("");
    
    console.log("title", selectedNote.title);
    



  };


  const handleChange = (key: string, value: string) => {

       setSelectedNote({...selectedNote, [key]: value})

  }


  
  console.log(notes);

  useEffect(() => {
    
      fetchNotes();
      
    
  }, []);

  console.log(notes);

  return (
    <div className="home">
      {/* notelist sidebar */}
      <div className="sidebar">
        {notes?.map((note: any) => (
          <NoteSelect
            key={note._id}
            note={note}
            deleteNote={deleteNote}
            viewNote={viewNote}
          />
        ))}

        {/* <button onClick={addNewNote}>Add New</button> */}
        <AiFillPlusCircle onClick={addNewNote} style={{ fontSize: "30px" }} />

      </div>

      {/* notecreator */}
      <div className="note-creator">

        <h1>{selectedNote.title}</h1>

        {/* <h2>{test}</h2> */}

        
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter title"
          className="title"
          value={selectedNote?.title}
          onChange={(event) => {handleChange("title", event.target.value)}}
          
        />

        <ReactQuill
          modules={modules}
          style={{ border: "none", fontSize: "30px" }}
          theme="snow"
          value={selectedNote.content}
          onChange={(value) =>
            setSelectedNote({ ...selectedNote, content: value })
          }
          placeholder="Add your content here..."
          className="editor"
        />

        {/* How do I handle edit? */}
        {!isEditing && (
          <button onClick={saveNewNote} className="add-button">
            Add
          </button>
        )}

        {isEditing && (
          <button onClick={() => editNote(id)} className="add-button">
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
