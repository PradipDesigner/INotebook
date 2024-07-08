
import React, { useRef, useState } from 'react'

function NoteInput({ addNote }) {
  const [heading, setHeading] = useState('')
  const [description, setDescription] = useState('')
  const handleHedingOnchnge = (event) => {
    setHeading(event.target.value)
  }
  const handledescOnchnge = (event) => {
    setDescription(event.target.value)
  }

  const handleHeading = useRef()
  const handleDesc = useRef()

  const FormSubmit = (e) => {
    e.preventDefault()
    const NewHeading = handleHeading.current.value
    const NewDesc = handleDesc.current.value
    // console.log(NewHeading, NewDesc)
    const localdata = localStorage.getItem('user')
    let userId;
    if(localdata){
      const userData = JSON.parse(localdata)
      if(userData && userData.id){
         userId = userData.id
        // console.log(userId)
      }
    }
    addNote(NewHeading, NewDesc, userId)
    // console.log(NewHeading, NewDesc, userId)


    setHeading('')
    setDescription('')
  }
  return (
    <>
      <form onSubmit={FormSubmit} className='w-100'>
        <div className="form-group mb-3">
          <input type="text" className='form-control' placeholder='Enter your task title' value={heading} ref={handleHeading} onChange={handleHedingOnchnge} />
        </div>
        <div className="form-group mb-3">
          <textarea name="description" className='form-control' placeholder='Description' value={description} ref={handleDesc} onChange={handledescOnchnge}></textarea>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type='submit' disabled={heading === "" || description === ""}>Add task</button>
        </div>
      </form>      
    </>

  )
}

export default NoteInput
