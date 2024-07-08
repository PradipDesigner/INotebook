import { useState, useEffect, useRef } from 'react'
import NoteInput from './NoteInput'
import NoteList from './NoteList'
import Error from './Error'


function Note() {
  const [noteList, setNotelist] = useState([]);
  const [editNote, setEditNote] = useState({ eId: '', etitle: '', edescription: '', eUserId: '' });
  const [message, setMessage] = useState('')
  const refClose = useRef()

  useEffect(() => {
    const fetchNote = async () => {
      const localdata = localStorage.getItem('user')

      if (localdata) {
        const userData = JSON.parse(localdata)
        if (userData && userData.id) {
          const userId = userData.id
          let URL = `http://localhost:3000/notes?userId=${userId}`;
          try {
            const res = await fetch(URL)
            const data = await res.json()
            setNotelist(data)
          }
          catch {
            console.error("Error fetching notes:", Error);
          }
        }
      }
    }
    fetchNote();
  }, [])

  const addNote = async (title, description, userId) => {
    if(localStorage.getItem('user')){
      let dataResponse = await fetch('http://localhost:3000/notes', {
      method: 'POST',
      body: JSON.stringify({ title, description, userId }),
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await dataResponse.json()
    console.log(result)
    setNotelist(notes => [...notes, { title: result.title, description: result.description, id: result.id, userId: result.userId }])
    }
    else{
      alert("Please Login or SignUp than you add Note.")
    }
  }
  const deleteList = async (listId) => {
    const localData = localStorage.getItem('user')
    if (localData) {
      const userData = JSON.parse(localData)
      if (userData && userData.id) {
        const userID = userData.id
        await fetch(`http://localhost:3000/notes/${listId}`, {
          method: 'DELETE'
        })
        const dataresponse = await fetch(`http://localhost:3000/notes?userId=${userID}`)
        const finalResult = await dataresponse.json()
        setNotelist(finalResult)
      }
    }
  }
  const HandleEditNote = (currentNote) => {
    setEditNote({
      eId: currentNote.id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      eUserId: currentNote.userId
    }
    );
  };
  const handleOnChange = (e) => {
    setEditNote({ ...editNote, [e.target.name]: e.target.value });
  };
  const saveEdit = async (e) => {
    e.preventDefault();
    console.log(editNote);
    const editDataResponse = await fetch(`http://localhost:3000/notes/${editNote.eId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editNote.etitle,
        description: editNote.edescription,
        userId: editNote.eUserId
      }),
    })

    const jsonResponse = await editDataResponse.json();
    setNotelist((prevNoteList) =>
      prevNoteList.map((note) =>
        note.id === editNote.eId
          ? { ...note, title: jsonResponse.title, description: jsonResponse.description, userId: jsonResponse.userId } : note
      )
    )

    refClose.current.click()
  };

  useEffect (() => {
    if(localStorage.getItem('user')){
      setMessage("Sorry! You have not added any Note yet.")
    }
    else{
      setMessage("Please Login than access your Note and if you have not ragister than Click on SignUp Button.")
    }
  }, [])
  
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h3 className='mb-3'>Add your Note!</h3>
            <NoteInput addNote={addNote} />
          </div>
          <div className="col-md-6 mt-5">
            {noteList.length === 0 ? (<Error msg={message} />) : <NoteList lists={noteList} deleteItem={deleteList} EditNote={HandleEditNote} />}
          </div>
        </div>
      </div>


      {/* this model for edit note */}
      <div className="modal fade" id='EditModel'>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <input
                  type="text"
                  className='form-control mb-3'
                  name="etitle"
                  value={editNote.etitle}
                  onChange={handleOnChange}
                />
                <textarea
                  className='form-control'
                  name="edescription"
                  value={editNote.edescription}
                  onChange={handleOnChange}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary" onClick={saveEdit}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Note