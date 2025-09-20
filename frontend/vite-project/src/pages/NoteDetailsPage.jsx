import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LoaderIcon } from 'lucide-react';
import { ArrowLeftIcon, Trash2Icon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NoteDetailsPage = () => {
  const [Note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  console.log({ id });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/notes/getbyid/${id}`
        );

        setNote(res.data);
        toast.success('Node fetched');
      } catch (error) {
        console.log('note does not found', error);
        toast.error('Node d0 not  fetched');
      } finally {
        setLoading(false);
      }
    };

    fetchdata();
  }, [id]);
  const handleDelete = async () => {
    console.log('thi is from' + { id });

    try {
      await axios.delete(`http://localhost:5000/api/notes/delete/${id}`);
      toast.success('Deleted');
      navigate('/');
    } catch (error) {
      console.log('error is there', error);
      toast.error('not delted');
    }
  };

  const handleSave =async () => {

    if(!Note.title.trim()||!Note.content.trim()){
toast.error("Plese add a title or content");
return;


    }
setSaving(true);
    try{
await axios.put(`http://localhost:5000/api/notes/update/${id}`,Note);
toast.success("Note is updated")

    }

    catch(error){
console.log("this is error" ,error);


    }
    finally{
setSaving(false);

    }




  };

  console.log({ Note });




  if (loading) {
    return (
      <div className="min-h-screen bg-200 flex item-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={Note?.title}
                  onChange={(e) => {
                    setNote({ ...Note, title: e.target.value });
                  }}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  value={Note?.content}
                  className="textarea textarea-bordered h-32"
                  onChange={(e) => {
                    setNote({ ...Note, content: e.target.value });
                  }}
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailsPage;
