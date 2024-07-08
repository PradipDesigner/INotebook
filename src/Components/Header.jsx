import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
const Header = ({ mode, userName }) => {

  // navigate use for route on btn click
  const navigate = useNavigate();

  // user logout function
  const LogOut = () => {
    localStorage.removeItem('user')
    setTimeout(() => {
      navigate("/")
    }, 1000);
  }
  // for username first letter capitalize
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">INotebook</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link active" to="/">Home</NavLink>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center">
            <button className="btn btn-dark mx-2" onClick={mode}><i className="bi bi-moon-fill"></i></button>
            {!localStorage.getItem('user') ?
              <>
                <NavLink to="/login"><button className="btn btn-primary mx-2" >Login</button></NavLink>
                <NavLink to="/signup"><button className="btn btn-primary mx-2">SignUp</button></NavLink></>
              : <><NavLink className="nav-link text-white mx-3"> Hi, {capitalize(userName)}</NavLink>
                <button className="btn btn-sm btn-outline-secondary ms-2" onClick={LogOut}><i className="bi bi-box-arrow-in-left"></i></button></>}
          </div>
        </div >
      </nav >
    </>

  )
}
export default Header