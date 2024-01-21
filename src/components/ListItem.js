import { render } from '@testing-library/react'
import React from 'react'
import { Link } from 'react-router-dom'

let getDate = (note) => {
  return new Date(note.updated).toLocaleDateString()
}

let getTitle = (note) => {
  const title = note.body.split('\n')[0]

  if(title.length > 45){
    return title.slice(0,45)
  }

  return title
}

let getContent = (note) => {
  const title = getTitle(note)
  let Content = note.body.replaceAll('\n', ' ')
  Content = Content.replaceAll(title, "")

  if(Content.length > 45){
    return Content.slice(0, 45)
  } else{
    return Content
  }
}

const ListItem = ({note}) => {
  return (
    <Link to={`/note/${note.id}`}>
        <div className='notes-list-item'>
        <h3>{getTitle(note)}</h3>
        <p><span>{getDate(note)}</span>{getContent(note)}</p>
        </div>
    </Link>
  )
}

export default ListItem
