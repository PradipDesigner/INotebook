import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({setUserName}) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [SuccessMsg, setSuccessMsg] = useState('')

  const navigate = useNavigate();

  const HandelSubmit = async (event) => {
    event.preventDefault()

    const response = await fetch('http://localhost:3000/users');
    if (!response) {
      console.log('Network response was not ok')
    }
    const users = await response.json();
    const user = users.find(
      (user) => user.username === username && user.password === password
    )
    if (user) {
      // alert('Login successful!');
      setSuccessMsg('Login Success')
      localStorage.setItem('user', JSON.stringify(user))
      setUserName(user.name)
      setTimeout(() => {
        navigate("/")
        setSuccessMsg('')
      }, 2000);
    } else {
      setError('Invalid username or password');
      setTimeout(() => {
        setError('')
      }, 3000);
    }
    setUsername(''),
    setPassword('')
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h5 className='mb-3'>Login For Acess INotebook</h5>
          {error && <h6 className='text-danger text-center fw-bold mb-3'>{error}</h6>}
          {SuccessMsg && <h6 className='text-success text-center'>{SuccessMsg}</h6>}

          <form onSubmit={HandelSubmit}>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary" onSubmit={HandelSubmit}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login