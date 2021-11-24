import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, createContext, useReducer, useContext } from 'react'
import { reducer, initialState } from './reducers/userReducer'
import "bootstrap/dist/css/bootstrap.min.css";

import CourseList from "./components/course-list.component";
import CreateCourse from "./components/create-course.component.js";
import AllCourses from "./components/all-course.component";
import Login from "./components/auth/login.component";
import Register from "./components/auth/register.component";
import Navbar from "./components/navbar.component";

export const UserContext = createContext()


function Routing() {
  const history = useNavigate()
  const location = useLocation();
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = localStorage.getItem("jwt");
    console.log(user);

    if (user) {
      dispatch({ type: "USER", payload: user });
      if (location.pathname == '/register' || location.pathname == '/login') {
        history("");
      }
    }
    else {
      if (location.pathname != '/register' && location.pathname != '/login') {
        history("login");
      }
    }
  }, [])
  return (
    <Routes>
      <Route path="/" element={<CourseList />} />
      <Route path="/create" element={<CreateCourse />} />
      <Route path="/allCourses" element={<AllCourses />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

