import React, {useContext, useEffect, useRef,useState} from 'react'
import NoteContext from '../Context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Note = (props) => {
    const context = useContext(NoteContext);
    const{note, fetchNote,editNote} = context;
    const {showAlert} = props;

    useEffect(() =>{fetchNote();},[])

    const ref = useRef(null);
    const refClose = useRef(null);
    const [notes,setNotes] = useState({id:"",etitle:"",edescription:"",etag:""});    

    const updateNote = (currentNote) =>{
        ref.current.click();
        setNotes({id: currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    } 
    
    const handleClick = (e) =>{
        e.preventDefault();
        editNote(notes.id, notes.etitle,notes.edescription,notes.etag); 
        refClose.current.click();
        props.showAlert("Updated Successfully","success");        
    }

    const handleChange = (e) =>{
        setNotes({...notes,[e.target.name]: e.target.value});
    }
    
    return (
    <>
        <AddNote showAlert={showAlert}/>
        {/*Button trigger modal*/}
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
        </button>

        {/*Modal*/}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">iNoteBook - Edit Note</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" name="etitle" aria-describedby="emailHelp" onChange={handleChange} value={notes.etitle}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <input type="text" className="form-control" id="edescription" name="edescription" onChange={handleChange} value={notes.edescription}/>
                            </div>
                            <div className="mb-3">
                            <label htmlFor="etag" className="form-label">Tag</label>
                            <input type="text" className="form-control" id="etag" name="etag" onChange={handleChange} value={notes.etag}/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleClick}>Update Changes</button>
                    </div>
                </div>
            </div>
        </div>
        <div className='row my-3'>
            <h2>Your Notes</h2>
            <div className='container mx-1'>
                {note.length === 0 && 'No notes to display'}
            </div>
            {note.map((note) =>{
                return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={showAlert}/>
            })}
        </div>
    </>
  )
}

export default Note;
