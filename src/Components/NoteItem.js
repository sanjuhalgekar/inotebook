import React, { useContext } from 'react'
import NoteContext from '../Context/notes/NoteContext';

export default function NoteItem(props) {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    const {note,updateNote} = props;

  return ( 
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}<br/>{note.tag}</p>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={() =>{updateNote(note)}}></i>
            <i className="fa-solid fa-trash mx-2" onClick={() => {
              deleteNote(note._id);
              props.showAlert("Deleted Successfully","success"); 
              }}>
            </i>
        </div>
      </div>
    </div>
  )
}
