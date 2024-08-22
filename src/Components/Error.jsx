import React from 'react'

function Error({msg}) {
  return (
    <div className='error-block'>
      <h5 className='text-center text-muted'>{msg}</h5>
    </div>
  )
}

export default Error