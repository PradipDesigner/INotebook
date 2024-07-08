import React from 'react'

function NoteList({ lists, deleteItem, EditNote }) {
  const capitalize =(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      <ul className="list-group list-group-numbered">
        {lists.map(item => <li key={item.id} className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">{capitalize(item.title)}</div>
            {item.description}
          </div>
          <button className="btn btn-sm btn-danger m-1" onClick={() => deleteItem(item.id)}><i className='bi bi-trash'></i></button>
          <button className="btn btn-sm btn-outline-secondary m-1" onClick={() => EditNote(item)} data-bs-toggle="modal" data-bs-target="#EditModel"><i className='bi bi-pen'></i></button>
        </li>)}
      </ul>
    </>
  )
}

export default NoteList
