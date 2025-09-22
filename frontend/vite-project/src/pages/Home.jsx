import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react';

import RateLimitedUI from  '../components/RateLimitedUI'
import toast from "react-hot-toast"
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';
import api from '../lib/axios';

const Home = () => {
const [isRateLiMited,setIsRateLimited]=useState(false);
const [notes,setNotes]=useState([]);
const [loading,setLoading]=useState(true);

useEffect(()=>{

  
  const fetchNotes=async ()=>{
    try{
const res= await api.get('/notes/getall');
setNotes(res.data);
    }
catch(error){
console.log("Error Fetch notes");
if(error.response?.status==429){
setIsRateLimited(true);

}
else{
toast.error("Failed to load notes")

}

}
setLoading(false);


  };
fetchNotes();

},[])

  return (
    <div className='min-h-screen' >
      <Navbar/>

      {isRateLiMited&&(<RateLimitedUI/>)}
      {loading&&<div className="text-center text-primary py-10" >Loading notes.... </div>}
{notes.length==0 && !isRateLiMited&& <NotesNotFound/> }

      {notes.length>0 &&!isRateLiMited &&( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {
notes.map(note=>(<div>< NoteCard key={note._id} note={note}  setNotes={setNotes} /></div>))

        }

        
      </div>) }

    </div>
  )
}

export default Home
