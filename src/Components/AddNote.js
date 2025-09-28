import React, { useState,useContext } from 'react'
import noteContext from "../Context/notes/NoteContext"

export default function AddNote(props) {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"",description:"",tag:"Personal"});

    const handleClick = (e) =>{
        e.preventDefault(); 
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:"Personal"});
        props.showAlert("Saved Successfully","success"); 
    }

    const handleChange = (e) =>{
        setNote({...note,[e.target.name]: e.target.value});        
    }

  return (
    <div>
      <div className='container my-3'>
        <h2>Add Notes</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={handleChange} value={note.title}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" onChange={handleChange} value={note.description}/>
          </div>
          <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" onChange={handleChange} value={note.tag}/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick} disabled={note.title.length < 5 && note.description.length < 5}>Add Note</button>
        </form>
      </div>
    </div>
  )
}
