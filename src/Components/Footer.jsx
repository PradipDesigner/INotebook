import React, { useState } from 'react'

const Footer = () => {
   const [year] = useState(new Date())
   const getYear = year.getFullYear()
  return (
    <div className='footer bg-secondary-subtle mt-auto py-2'>
      <div className="container-fluid d-flex justify-content-between">
        <span>© {getYear} all right reserved</span>
        <span>Created by <a href="mailto:pradipsingh8435@gmail.com">Pradip Singh Baghel</a></span>
      </div>
    </div>
  )
}

export default Footer
