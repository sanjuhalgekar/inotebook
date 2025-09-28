import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) =>{
    const host = "http://localhost:5000";

    const notes = []

    const [note, setNote] = useState(notes);

    //Fetch Note
    const fetchNote = async (title, description, tag) => {
        //Update API Call 
       const fetchPromise = await fetch(`${host}/api/notes/fetchallnotes`, {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             "auth-token" : localStorage.getItem("token")
           }
       });

       const json = await fetchPromise.json();
       //console.log(json);
       setNote(json);
   };

    //Add Note
    const addNote = async (title, description, tag) => {
         //Update API Call 
        const fetchPromise = await fetch(`${host}/api/notes/addnotes`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token" : localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag }),
        });   
        
        const json = await fetchPromise.json();
          
        const newNote = {
            "_id": json._id,
            "user": json.user,
            "title": json.title,
            "description": json.description,
            "tag": json.tag,
            "date": json.date,
            "__v": json.__v
        };
    
        // Update the state by appending the new note to the existing array
        setNote((prevNotes) => [...prevNotes, newNote]);
    };

    //Edit Note 
    const editNote = async (id,title,description,tag) =>{
        //Update API Call
        const fetchPromise = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4YjQxMTFmODExMmQ0NGQyNmZjMTk5In0sImlhdCI6MTczODQ3MzE3OH0.S73qFDEu9P_oyYTlHC4zyN7vpLQ2P4KRpGDBzuWncQ4"
            },
            body: JSON.stringify({ title, description, tag }), 
          });
          
          // Parse response JSON
            const json = await fetchPromise.json();
            console.log(json);
            
            // ✅ Create a copy of the existing notes array
            let newNote = [...note];

        //Logic for editing note
        for(let index = 0; index < newNote.length; index++){
            const element = newNote[index];
            if(element._id === id){
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }
        } 
        setNote(newNote);       
    };

    //Delete Note
    const deleteNote = async (id) =>{
        //Update API Call 
        const fetchPromise = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "auth-token" : localStorage.getItem("token")
            }
        }); 

        const newNote = note.filter((note) =>{return note._id !== id});        
        setNote(newNote);
    };

    return(
        <NoteContext.Provider value={{note, setNote,fetchNote,addNote,editNote,deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default  NoteState;