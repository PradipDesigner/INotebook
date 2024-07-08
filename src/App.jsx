import Header from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Note from "./Components/Note";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import { useEffect } from "react";
import Footer from "./Components/Footer";
function App() {
  const handleMode = () => {
    const currentTheme = document.body.getAttribute("data-bs-theme");
    if (currentTheme === "dark") {
      document.body.removeAttribute("data-bs-theme");
      localStorage.setItem('mode', 'light')
    } else {
      document.body.setAttribute("data-bs-theme", "dark");
      localStorage.setItem('mode', 'dark')
    }
  };

  const [userName, setUserName] = useState('');

  useEffect(() => {
    const localdata = localStorage.getItem('user');
    if (localdata) {
      const userData = JSON.parse(localdata);
      if (userData && userData.name) {
        setUserName(userData.name);
      }
    }

    const localMode = localStorage.getItem('mode')
    if (localMode === "dark") {
      document.body.setAttribute("data-bs-theme", "dark");
    }
    else {
      document.body.setAttribute("data-bs-theme", "light");
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        {/* <Header mode={handleMode} userName={userName}/> */}
        <Header mode={handleMode} userName={userName} />
        <div className="main">
          <Routes>
            <Route path="/" element={<Note />}></Route>
            <Route path="login" element={<Login setUserName={setUserName} />}></Route>
            <Route path="signup" element={<SignUp />}></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}
export default App