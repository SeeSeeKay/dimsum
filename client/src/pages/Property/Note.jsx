import React, { useState } from 'react';
import api from '../../utils/api';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const NotesApp = (props) => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const {userInfo, isLoading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Current propertyId : "+props.propertyId);
    console.log("Current note : "+note);

    const noteData = {
      propertyId: props.propertyId,
      description: note
    }

    try{
      if (note.trim()) {
        if (isEditing) {
          const updatedNotes = notes.map((n, index) =>
            index === currentIndex ? note : n
          );
          setNotes(updatedNotes);
          setIsEditing(false);
          setCurrentIndex(null);
        } else {
          setNotes([...notes, note]);
          const res = await api.post('properties/notes/add',
            noteData 
            //TODO: For now comment out to bypass this headers
            // {
            //   headers:{
            //     'Content-Type': 'multipart/form-data',
            //     Authorization: `Bearer ${userInfo.accessToken}`
            //   }
            // }
          );  
        }
      }
    } catch(err){
      toast.error(err.message);
      console.log(err.message);
    }
    
    setNote('');

  };

  const handleEdit = (index) => {
    setCurrentIndex(index);
    setNote(notes[index]);
    setIsEditing(true);
  };

  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    if (isEditing && currentIndex === index) {
      setIsEditing(false);
      setNote('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative w-full mb-3">
          <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="note">
            Note
          </label>
          <textarea
            id="note"
            value={note}
            onChange={handleChange}
            placeholder="Enter your note"
            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
            rows={5} // Adjust the number of rows as needed
            style={{ transition: 'all .15s ease' }}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-2 rounded shadow focus:outline-none"
        >
          {isEditing ? 'Update Note' : 'Add Note'}
        </button>
      </form>

      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Note
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-100"></th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {note}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-right">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-500 hover:text-blue-700 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotesApp;