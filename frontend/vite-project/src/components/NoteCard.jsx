import React from 'react'
import { Link } from 'react-router-dom'
import { PenSquareIcon } from 'lucide-react'
import { Trash2Icon } from 'lucide-react'
import axios from "axios";
import toast from 'react-hot-toast';
const NoteCard = ({note,setNotes }  ) => {

const handleonClick=async(e,id)=>{
   e.preventDefault();
if(!window.confirm("Are you sure you want to delete this note")) return;
try{
  console.log(id);
  
await axios.delete(`http://localhost:5000/api/notes/delete/${id}`);

setNotes((prev)=>prev.filter((note)=>note._id!==id));
toast.success("deleted");

}catch(error){
console.log("Error in function",error)
toast.error("not deleted");
}


}

  return (
        <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
   {note.createdAt}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error  "
           onClick={(e)=>{handleonClick(e,note._id)} }
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard
