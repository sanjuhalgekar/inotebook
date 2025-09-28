import React, {useContext, useEffect} from 'react'
import NoteContext from '../Context/notes/NoteContext'

const About = () =>{
  const a = useContext(NoteContext)
  useEffect(()=>{
      
  },[])

  return(
    <div>
      This About 
    </div>
  )
}

export default About;
