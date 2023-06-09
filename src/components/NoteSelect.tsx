import { INote } from "../pages/Home";
import {CiMenuKebab} from 'react-icons/ci'
import { useState } from 'react';

interface Props {

    deleteNote: (id: string) => void;
    viewNote: (note: INote) => void;
    note: INote;
}


const NoteSelect = ({deleteNote, note, viewNote}: Props) => {
   
    const [visible, setVisible] = useState(false)

    const handleVisibility = () => {

        setVisible((prev) => !prev)
    }

    return (

       <div 
        key={ note._id } 
        style={
          { display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '10px', 
            paddingInline: '1.2rem',
            backgroundColor: 'lightgrey' ,
            paddingBlock: '10px',
        
          }
        }
       >
          <p> { note.title } </p>
          <div style={{ position: 'relative', zIndex: "5" }}>
            <CiMenuKebab onClick={handleVisibility}/>
            {visible && <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '5px',
                width: '200px',
                position: 'absolute',
                // paddingInline: '2rem',
                boxShadow: '5px 10px 30px lightgrey',
                top: '0',
                left: '10%',
                zIndex: '10',
                backgroundColor: 'white',
                paddingBlock: '1.3rem',



             }}
             onMouseLeave={() => setVisible(false)}
             >


                <p className="option-paragraph" onClick={() => deleteNote(note._id)}>Delete</p>
                <p className="option-paragraph" onClick={() => viewNote(note)}>View</p>

                


            </div>}
          </div>
          
        
      </div>
    )

}

export default NoteSelect;