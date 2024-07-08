import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', username: '', password: '' })
  const [error, setError] = useState('')
  const HandleOnChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const SignUp = async (event) => {
    event.preventDefault();
    const userResponse = await fetch('http://localhost:3000/users')
    const users = await userResponse.json()
    console.log(users)
    const checkExitsUser = users.some((exitingUser) => exitingUser.username === user.username)
    if (checkExitsUser) {
      setError("This Email Already ragister Please Login")
      setTimeout(() => {
        setError('')
      }, 5000);
    }
    else {
      console.log("user not ragister")
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const result = await response.json();

      if (result) {
        // localStorage.setItem('user', JSON.stringify(user))
        setError('Your account SignUp successfully! ')
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h5 className='mb-3'>SignUp to INotebook</h5>
          {error && <h6 className='text-success text-center mb-3'>{error}</h6>}
          <form onSubmit={SignUp}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="textinput"
                name="name"
                placeholder="Enter your name"
                value={user.name}
                onChange={HandleOnChange}
                required />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                name="username"
                placeholder="Enter your email"
                value={user.username}
                onChange={HandleOnChange}
                required />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                placeholder="Create Password"
                value={user.password}
                onChange={HandleOnChange}
                required />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
