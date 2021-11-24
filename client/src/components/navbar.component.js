import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';

function Navbar() {
    function logout() {
        localStorage.clear();
        window.location.reload();
    }

    const location = useLocation()
        if (location.pathname != '/register' && location.pathname != '/login') {
            return (
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg fixed-left">
                    <div className="header">
                        <h3>CourseTrack</h3>
                    </div>
                    <hr />
                    <div className="collpase navbar-collapse">
                        <div className="message">
                            <h5 id="message">Welcome, Soham!</h5>
                        </div>
                        <hr />
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">My Courses</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/allCourses" className="nav-link">All Courses</Link>
                            </li>
                            {/* <li className="navbar-item">
                                <Link to="/addCourse" className="nav-link">Add Course</Link>
                            </li> */}
                            <li className="navbar-item">
                                <Link to="/create" className="nav-link">Create Course</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav mr-auto footer">
                            <li className="navbar-item">
                                <a onClick={logout} className="nav-link logout">Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            );
        } else {
            return (
                <>
                </>
            );
        }
}

export default Navbar;