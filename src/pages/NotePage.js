import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import notes from '../assets/data'
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
// import { version } from 'react';

// console.log(version);

const NotePage = (props) => {
  let noteId = useParams()
  const navigate = useNavigate()



  // let note = notes.find(note => note.id === Number(noteId['id']))

  let [note, setNotes] = useState(null)

  useEffect(() => {
    getNote()
  }, [noteId['id']])

  let getNote = async () => {

    if (noteId['id'] === "new") return

    let response = await fetch(`http://localhost:5000/notes/${noteId['id']}`)
    // console.log(response.json())
    let data = await response.json()
    setNotes(data)
  }

  let updateNote = async () => {
    await fetch(`http://localhost:5000/notes/${noteId['id']}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...note, 'updated': new Date() })
    })
  }

  let createNote = async () => {
    await fetch(`http://localhost:5000/notes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...note, 'updated': new Date() })
    })
  }

  let deleteNote = async () => {
    await fetch(`http://localhost:5000/notes/${noteId['id']}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...note, 'updated': new Date() })
    })
    navigate('/')
  }

  let handleSubmit = () => {

    if(noteId['id'] !== 'new' && !note.body){
      deleteNote()
    } else if (noteId['id'] !== 'new'){
      updateNote()
    }else if(noteId['id'] === 'new' && note !== null){
      createNote()
    }
    navigate('/')
  }

  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>

        {noteId['id'] !== 'new' ?(
          <button onClick={deleteNote}>Delete</button>
        ): (
          <button onClick={handleSubmit}>Done</button>
        )}

      </div>

      <textarea onChange={(e) => { setNotes({ ...note, 'body': e.target.value }) }} value={note?.body}>

      </textarea>

    </div>
  )
}

export default NotePage
